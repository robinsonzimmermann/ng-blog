import { Component, Inject, Renderer2 } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { NavigationComponent } from './core/layout/navigation/navigation.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'blog-root',
  standalone: true,
  imports: [CommonModule, NavigationComponent, FooterComponent, RouterOutlet, MarkdownModule, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'blog';

  constructor(@Inject(DOCUMENT) private document: Document, r: Renderer2) {
    if (this.isDarkMode()) {
      r.addClass(document.body, 'dark-theme');
      r.removeClass(document.body, 'light-theme');
    } else {
      r.addClass(document.body, 'light-theme');
    }
  }

  private isDarkMode() {
    return typeof this.document.defaultView?.window?.matchMedia === 'function' ?
      typeof this.document.defaultView?.window?.matchMedia('(prefers-color-scheme: dark)').matches :
      false;
  }
}
