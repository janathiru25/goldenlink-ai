import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface CommunityArea {
  name: string;
  responders: number;
  available: number;
  activeIncidents: number;
  coverage: number;
  icon: string;
}

interface CommunityMember {
  certificateName: string;
  photoName: string;
  name: string;
  dob: string;
  place: string;
  email: string;
  contactNumber: string;
  vehicle: string;
  maritalStatus: string;
  gender: string;
  designation: string;
}

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './community.html',
  styleUrl: './community.scss',
})
export class Community implements OnDestroy {

  communityAreas: CommunityArea[] = [
    {
      name: 'Chennai',
      responders: 128,
      available: 34,
      activeIncidents: 5,
      coverage: 86,
      icon: 'bi-buildings'
    },
    {
      name: 'Coimbatore',
      responders: 92,
      available: 28,
      activeIncidents: 3,
      coverage: 78,
      icon: 'bi-building'
    },
    {
      name: 'Madurai',
      responders: 67,
      available: 19,
      activeIncidents: 2,
      coverage: 64,
      icon: 'bi-geo-alt'
    },
    {
      name: 'Trichy',
      responders: 54,
      available: 16,
      activeIncidents: 1,
      coverage: 58,
      icon: 'bi-geo'
    }
  ];

  /* =========================
     REGISTRATION STATE
  ========================= */

  showJoinForm = false;
  submitted = false;

  currentStep: 'registration' | 'otp' = 'registration';

  mobileVerified = false;
  otpSent = false;

  otpCode = '';
  enteredOtp = '';

  otpMessage = '';
  otpError = '';

  otpSecondsRemaining = 300;
  private otpTimer: ReturnType<typeof setInterval> | null = null;

  /* =========================
     CAPTCHA
  ========================= */

  captchaFirst = 0;
  captchaSecond = 0;
  captchaAnswer = '';
  captchaError = '';

  /* =========================
     FILE NAMES
  ========================= */

  selectedPhotoName = '';
  selectedCertificateName = '';

  /* =========================
     MEMBER FORM
  ========================= */

  communityMember: CommunityMember = {
    certificateName: '',
    photoName: '',
    name: '',
    dob: '',
    place: '',
    email: '',
    contactNumber: '',
    vehicle: '',
    maritalStatus: '',
    gender: '',
    designation: ''
  };


  /* =========================
     STATISTICS
  ========================= */

  get totalResponders(): number {
    return this.communityAreas.reduce(
      (total, area) => total + area.responders,
      0
    );
  }

  get totalAvailable(): number {
    return this.communityAreas.reduce(
      (total, area) => total + area.available,
      0
    );
  }

  get totalIncidents(): number {
    return this.communityAreas.reduce(
      (total, area) => total + area.activeIncidents,
      0
    );
  }

  get averageCoverage(): number {
    const total = this.communityAreas.reduce(
      (sum, area) => sum + area.coverage,
      0
    );

    return Math.round(total / this.communityAreas.length);
  }


  /* =========================
     JOIN COMMUNITY
  ========================= */

  joinCommunity(): void {
    this.resetRegistrationData();

    this.showJoinForm = true;
    this.submitted = false;
    this.currentStep = 'registration';

    this.generateCaptcha();
  }

  closeJoinForm(): void {
    this.stopOtpTimer();

    this.showJoinForm = false;
    this.submitted = false;
    this.currentStep = 'registration';
    this.otpSent = false;
    this.mobileVerified = false;
  }


  /* =========================
     MOBILE NUMBER
  ========================= */

  onMobileInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    const numbersOnly = input.value
      .replace(/\D/g, '')
      .slice(0, 10);

    this.communityMember.contactNumber = numbersOnly;

    input.value = numbersOnly;

    // If mobile changes after verification,
    // verification must be done again.
    if (this.mobileVerified) {
      this.mobileVerified = false;
      this.otpSent = false;
      this.enteredOtp = '';
      this.otpMessage = '';
      this.otpError = '';
      this.stopOtpTimer();
    }
  }


  /* =========================
     DATE OF BIRTH
  ========================= */

  get maxDob(): string {
    const today = new Date();

    return today.toISOString().split('T')[0];
  }


  /* =========================
     GMAIL VALIDATION
  ========================= */

  isGmailValid(): boolean {
    const email = this.communityMember.email.trim();

    return /^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(email);
  }


  /* =========================
     PHOTO UPLOAD
  ========================= */

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      this.selectedPhotoName = '';
      this.communityMember.photoName = '';
      return;
    }

    const file = input.files[0];

    const allowedTypes = [
      'image/jpeg',
      'image/png'
    ];

    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a JPG, JPEG or PNG image.');
      input.value = '';
      this.selectedPhotoName = '';
      this.communityMember.photoName = '';
      return;
    }

    this.selectedPhotoName = file.name;
    this.communityMember.photoName = file.name;
  }


  /* =========================
     CERTIFICATE UPLOAD
  ========================= */

  onCertificateSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      this.selectedCertificateName = '';
      this.communityMember.certificateName = '';
      return;
    }

    const file = input.files[0];

    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png'
    ];

    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a PDF, JPG, JPEG or PNG certificate.');
      input.value = '';
      this.selectedCertificateName = '';
      this.communityMember.certificateName = '';
      return;
    }

    this.selectedCertificateName = file.name;
    this.communityMember.certificateName = file.name;
  }


  /* =========================
     CAPTCHA
  ========================= */

  generateCaptcha(): void {
    this.captchaFirst = Math.floor(Math.random() * 9) + 1;
    this.captchaSecond = Math.floor(Math.random() * 9) + 1;

    this.captchaAnswer = '';
    this.captchaError = '';
  }

  verifyCaptcha(): boolean {
    const answer = Number(this.captchaAnswer);

    if (!this.captchaAnswer || answer !== this.captchaFirst + this.captchaSecond) {
      this.captchaError = 'Incorrect CAPTCHA. Please try again.';
      this.generateCaptcha();
      return false;
    }

    this.captchaError = '';

    return true;
  }


  /* =========================
     SEND OTP
  ========================= */

  sendOtp(): void {

    if (!this.isRegistrationValid()) {
      return;
    }

    if (!this.verifyCaptcha()) {
      return;
    }

    /*
     * FRONTEND DEMO OTP
     *
     * IMPORTANT:
     * This will be replaced by the backend API.
     *
     * Real flow:
     *
     * Angular
     *    ↓
     * POST /api/auth/send-otp
     *    ↓
     * Backend
     *    ↓
     * SMS provider
     *    ↓
     * +91 mobile
     */

    this.otpCode = this.generateDemoOtp();

    this.otpSent = true;
    this.currentStep = 'otp';

    this.enteredOtp = '';
    this.otpError = '';

    this.otpMessage =
      `Demo OTP sent to +91 ${this.communityMember.contactNumber}`;

    this.startOtpTimer();

    /*
     * DEVELOPMENT ONLY
     *
     * The OTP is shown in the UI so you can test the frontend.
     * Remove this message when backend OTP is integrated.
     */
    this.otpMessage += ` — Demo OTP: ${this.otpCode}`;
  }


  /* =========================
     DEMO OTP GENERATOR
  ========================= */

  private generateDemoOtp(): string {
    return Math.floor(
      100000 + Math.random() * 900000
    ).toString();
  }


  /* =========================
     OTP TIMER
  ========================= */

  private startOtpTimer(): void {

    this.stopOtpTimer();

    this.otpSecondsRemaining = 300;

    this.otpTimer = setInterval(() => {

      if (this.otpSecondsRemaining > 0) {
        this.otpSecondsRemaining--;
      } else {
        this.stopOtpTimer();

        this.otpError =
          'OTP expired. Please request a new OTP.';
      }

    }, 1000);
  }

  private stopOtpTimer(): void {

    if (this.otpTimer) {
      clearInterval(this.otpTimer);
      this.otpTimer = null;
    }
  }

  get otpTimeDisplay(): string {

    const minutes = Math.floor(
      this.otpSecondsRemaining / 60
    );

    const seconds =
      this.otpSecondsRemaining % 60;

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }


  /* =========================
     OTP INPUT
  ========================= */

  onOtpInput(event: Event): void {

    const input = event.target as HTMLInputElement;

    const numbersOnly = input.value
      .replace(/\D/g, '')
      .slice(0, 6);

    this.enteredOtp = numbersOnly;

    input.value = numbersOnly;

    this.otpError = '';
  }


  /* =========================
     VERIFY OTP
  ========================= */

  verifyOtp(): void {

    if (this.enteredOtp.length !== 6) {

      this.otpError =
        'Please enter the 6-digit OTP.';

      return;
    }

    if (this.otpSecondsRemaining <= 0) {

      this.otpError =
        'OTP expired. Please request a new OTP.';

      return;
    }

    /*
     * FRONTEND DEMO VERIFICATION
     *
     * Real implementation will call:
     *
     * POST /api/auth/verify-otp
     *
     * Backend will verify the OTP.
     */

    if (this.enteredOtp !== this.otpCode) {

      this.otpError =
        'Incorrect OTP. Please check the OTP and try again.';

      return;
    }

    this.mobileVerified = true;

    this.otpSent = false;

    this.otpError = '';

    this.otpMessage =
      'Mobile number verified successfully.';

    this.stopOtpTimer();
  }


  /* =========================
     RESEND OTP
  ========================= */

  resendOtp(): void {

    this.otpCode = this.generateDemoOtp();

    this.enteredOtp = '';

    this.otpError = '';

    this.otpSecondsRemaining = 300;

    this.startOtpTimer();

    this.otpMessage =
      `New demo OTP sent to +91 ${this.communityMember.contactNumber}` +
      ` — Demo OTP: ${this.otpCode}`;
  }


  /* =========================
     CHANGE MOBILE
  ========================= */

  changeMobileNumber(): void {

    this.currentStep = 'registration';

    this.otpSent = false;

    this.enteredOtp = '';

    this.otpError = '';

    this.otpMessage = '';

    this.mobileVerified = false;

    this.stopOtpTimer();

    this.generateCaptcha();
  }


  /* =========================
     FORM VALIDATION
  ========================= */

  isRegistrationValid(): boolean {

    if (!this.communityMember.name.trim()) {
      alert('Please enter your name.');
      return false;
    }

    if (!this.communityMember.dob) {
      alert('Please select your date of birth.');
      return false;
    }

    if (!this.communityMember.gender) {
      alert('Please select your gender.');
      return false;
    }

    if (!this.communityMember.place.trim()) {
      alert('Please enter your place.');
      return false;
    }

    if (!this.communityMember.contactNumber) {
      alert('Please enter your mobile number.');
      return false;
    }

    if (!/^[0-9]{10}$/.test(this.communityMember.contactNumber)) {
      alert('Mobile number must contain exactly 10 digits.');
      return false;
    }

    if (!this.communityMember.email.trim()) {
      alert('Please enter your Gmail address.');
      return false;
    }

    if (!this.isGmailValid()) {
      alert('Please enter a valid Gmail address ending with @gmail.com.');
      return false;
    }

    if (!this.communityMember.vehicle) {
      alert('Please select your vehicle type.');
      return false;
    }

    if (!this.communityMember.maritalStatus) {
      alert('Please select your marital status.');
      return false;
    }

    if (!this.communityMember.designation.trim()) {
      alert('Please enter your designation.');
      return false;
    }

    if (!this.communityMember.photoName) {
      alert('Please upload your photo.');
      return false;
    }

    if (!this.communityMember.certificateName) {
      alert('Please upload your volunteer verification certificate.');
      return false;
    }

    return true;
  }


  /* =========================
     FINAL REGISTRATION
  ========================= */

  submitCommunityForm(): void {

    if (!this.mobileVerified) {

      this.otpError =
        'Please verify your mobile number before submitting.';

      return;
    }

    if (!this.isRegistrationValid()) {
      return;
    }

    const registration = {
      ...this.communityMember,

      mobileNumber:
        `+91${this.communityMember.contactNumber}`,

      mobileVerified: true,

      verificationStatus: 'Pending',

      submittedAt:
        new Date().toISOString()
    };

    /*
     * TEMPORARY FRONTEND STORAGE
     *
     * This is only for the frontend demo.
     * The real application will send this data
     * to the backend API.
     */

    const existingMembers = JSON.parse(
      localStorage.getItem(
        'goldenlink_community_members'
      ) || '[]'
    );

    existingMembers.push(registration);

    localStorage.setItem(
      'goldenlink_community_members',
      JSON.stringify(existingMembers)
    );

    this.stopOtpTimer();

    this.submitted = true;
  }


  /* =========================
     RESET
  ========================= */

  resetRegistrationData(): void {

    this.communityMember = {
      certificateName: '',
      photoName: '',
      name: '',
      dob: '',
      place: '',
      email: '',
      contactNumber: '',
      vehicle: '',
      maritalStatus: '',
      gender: '',
      designation: ''
    };

    this.selectedPhotoName = '';
    this.selectedCertificateName = '';

    this.currentStep = 'registration';

    this.mobileVerified = false;

    this.otpSent = false;

    this.enteredOtp = '';

    this.otpCode = '';

    this.otpMessage = '';

    this.otpError = '';

    this.captchaAnswer = '';

    this.captchaError = '';

    this.stopOtpTimer();
  }


  resetForm(): void {

    this.resetRegistrationData();

    this.submitted = false;

    this.showJoinForm = false;
  }


  /* =========================
     AREA
  ========================= */

  viewArea(area: CommunityArea): void {

    alert(
      `${area.name} Community\n\n` +
      `Responders: ${area.responders}\n` +
      `Available: ${area.available}\n` +
      `Active incidents: ${area.activeIncidents}\n` +
      `Coverage: ${area.coverage}%`
    );
  }


  /* =========================
     DESTROY
  ========================= */

  ngOnDestroy(): void {
    this.stopOtpTimer();
  }
}