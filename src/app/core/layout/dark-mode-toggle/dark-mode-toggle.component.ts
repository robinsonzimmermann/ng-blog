import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';

const STORAGE_KEY = 'darkMode';

@Component({
  selector: 'blog-dark-mode-toggle',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    MatIconModule,
  ],
  templateUrl: './dark-mode-toggle.component.html',
  styleUrl: './dark-mode-toggle.component.scss'
})
export class DarkModeToggleComponent implements OnInit {
  dark = false;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    if (this.document.defaultView?.window.localStorage.getItem(STORAGE_KEY) === 'true') {
      this.dark = true;
    }
    this.toggleBodyClass();
  }

  onChange(event: MatSlideToggleChange) {
    this.dark = event.checked;
    this.document.defaultView?.window.localStorage.setItem(STORAGE_KEY, `${event.checked}`);
    this.toggleBodyClass();
  }

  private toggleBodyClass() {
    this.document.documentElement.classList.remove('dark-theme', 'light-theme')
    if (this.dark) {
      this.document.documentElement.classList.add('dark-theme');
    } else {
      this.document.documentElement.classList.add('light-theme');
    }
  }
}
