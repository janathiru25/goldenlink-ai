import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.scss'
})
export class ThemeToggle implements OnInit {

  isDarkMode = false;

  ngOnInit(): void {

    const savedTheme = localStorage.getItem('goldenlink-theme');

    if (savedTheme === 'dark') {
      this.isDarkMode = true;
      document.body.classList.add('dark-theme');
    } else {
      this.isDarkMode = false;
      document.body.classList.remove('dark-theme');
    }
  }

  toggleTheme(): void {

    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {

      document.body.classList.add('dark-theme');

      localStorage.setItem(
        'goldenlink-theme',
        'dark'
      );

    } else {

      document.body.classList.remove('dark-theme');

      localStorage.setItem(
        'goldenlink-theme',
        'light'
      );
    }
  }
}