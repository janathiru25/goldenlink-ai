import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslationService } from '../../../core/services/translation';

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

  readonly translation = inject(TranslationService);

  t(key: string): string {
    return this.translation.translate(key);
  }

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

  captchaFirst = 0;
  captchaSecond = 0;
  captchaAnswer = '';
  captchaError = '';

  selectedPhotoName = '';
  selectedCertificateName = '';

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

  onMobileInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    const numbersOnly = input.value
      .replace(/\D/g, '')
      .slice(0, 10);

    this.communityMember.contactNumber = numbersOnly;

    input.value = numbersOnly;

    if (this.mobileVerified) {
      this.mobileVerified = false;
      this.otpSent = false;
      this.enteredOtp = '';
      this.otpMessage = '';
      this.otpError = '';
      this.stopOtpTimer();
    }
  }

  get maxDob(): string {
    const today = new Date();

    return today.toISOString().split('T')[0];
  }

  isGmailValid(): boolean {
    const email = this.communityMember.email.trim();

    return /^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(email);
  }

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
      alert(this.t('communityPhotoFormatError'));

      input.value = '';
      this.selectedPhotoName = '';
      this.communityMember.photoName = '';

      return;
    }

    this.selectedPhotoName = file.name;
    this.communityMember.photoName = file.name;
  }

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
      alert(this.t('communityCertificateFormatError'));

      input.value = '';
      this.selectedCertificateName = '';
      this.communityMember.certificateName = '';

      return;
    }

    this.selectedCertificateName = file.name;
    this.communityMember.certificateName = file.name;
  }

  generateCaptcha(): void {
    this.captchaFirst = Math.floor(Math.random() * 9) + 1;
    this.captchaSecond = Math.floor(Math.random() * 9) + 1;

    this.captchaAnswer = '';
    this.captchaError = '';
  }

  verifyCaptcha(): boolean {
    const answer = Number(this.captchaAnswer);

    if (
      !this.captchaAnswer ||
      answer !== this.captchaFirst + this.captchaSecond
    ) {
      this.captchaError = this.t('communityIncorrectCaptcha');

      this.generateCaptcha();

      return false;
    }

    this.captchaError = '';

    return true;
  }

  sendOtp(): void {
    if (!this.isRegistrationValid()) {
      return;
    }

    if (!this.verifyCaptcha()) {
      return;
    }

    this.otpCode = this.generateDemoOtp();

    this.otpSent = true;
    this.currentStep = 'otp';

    this.enteredOtp = '';
    this.otpError = '';

    this.otpMessage =
      `${this.t('communityDemoOtpSentTo')} +91 ${this.communityMember.contactNumber}`;

    this.startOtpTimer();

    this.otpMessage +=
      ` — ${this.t('communityDemoOtp')}: ${this.otpCode}`;
  }

  private generateDemoOtp(): string {
    return Math.floor(
      100000 + Math.random() * 900000
    ).toString();
  }

  private startOtpTimer(): void {
    this.stopOtpTimer();

    this.otpSecondsRemaining = 300;

    this.otpTimer = setInterval(() => {

      if (this.otpSecondsRemaining > 0) {
        this.otpSecondsRemaining--;
      } else {
        this.stopOtpTimer();

        this.otpError =
          this.t('communityOtpExpiredRequest');
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

  onOtpInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    const numbersOnly = input.value
      .replace(/\D/g, '')
      .slice(0, 6);

    this.enteredOtp = numbersOnly;

    input.value = numbersOnly;

    this.otpError = '';
  }

  verifyOtp(): void {

    if (this.enteredOtp.length !== 6) {
      this.otpError =
        this.t('communityEnterSixDigitOtp');

      return;
    }

    if (this.otpSecondsRemaining <= 0) {
      this.otpError =
        this.t('communityOtpExpiredRequest');

      return;
    }

    if (this.enteredOtp !== this.otpCode) {
      this.otpError =
        this.t('communityIncorrectOtp');

      return;
    }

    this.mobileVerified = true;

    this.otpSent = false;

    this.otpError = '';

    this.otpMessage =
      this.t('communityMobileVerified');

    this.stopOtpTimer();
  }

  resendOtp(): void {

    this.otpCode = this.generateDemoOtp();

    this.enteredOtp = '';

    this.otpError = '';

    this.otpSecondsRemaining = 300;

    this.startOtpTimer();

    this.otpMessage =
      `${this.t('communityNewDemoOtpSentTo')} +91 ${this.communityMember.contactNumber}` +
      ` — ${this.t('communityDemoOtp')}: ${this.otpCode}`;
  }

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

  isRegistrationValid(): boolean {

    if (!this.communityMember.name.trim()) {
      alert(this.t('communityEnterName'));
      return false;
    }

    if (!this.communityMember.dob) {
      alert(this.t('communitySelectDob'));
      return false;
    }

    if (!this.communityMember.gender) {
      alert(this.t('communitySelectGender'));
      return false;
    }

    if (!this.communityMember.place.trim()) {
      alert(this.t('communityEnterPlace'));
      return false;
    }

    if (!this.communityMember.contactNumber) {
      alert(this.t('communityEnterMobile'));
      return false;
    }

    if (!/^[0-9]{10}$/.test(this.communityMember.contactNumber)) {
      alert(this.t('communityMobileTenDigits'));
      return false;
    }

    if (!this.communityMember.email.trim()) {
      alert(this.t('communityEnterGmail'));
      return false;
    }

    if (!this.isGmailValid()) {
      alert(this.t('communityValidGmail'));
      return false;
    }

    if (!this.communityMember.vehicle) {
      alert(this.t('communitySelectVehicle'));
      return false;
    }

    if (!this.communityMember.maritalStatus) {
      alert(this.t('communitySelectMaritalStatus'));
      return false;
    }

    if (!this.communityMember.designation.trim()) {
      alert(this.t('communityEnterDesignation'));
      return false;
    }

    if (!this.communityMember.photoName) {
      alert(this.t('communityUploadPhoto'));
      return false;
    }

    if (!this.communityMember.certificateName) {
      alert(this.t('communityUploadCertificate'));
      return false;
    }

    return true;
  }

  submitCommunityForm(): void {

    if (!this.mobileVerified) {
      this.otpError =
        this.t('communityVerifyMobileBeforeSubmit');

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

  viewArea(area: CommunityArea): void {

    alert(
      `${area.name} ${this.t('communityWord')}\n\n` +
      `${this.t('communityResponders')}: ${area.responders}\n` +
      `${this.t('communityAvailable')}: ${area.available}\n` +
      `${this.t('communityActiveIncidents')}: ${area.activeIncidents}\n` +
      `${this.t('communityCoverage')}: ${area.coverage}%`
    );
  }

  ngOnDestroy(): void {
    this.stopOtpTimer();
  }
}