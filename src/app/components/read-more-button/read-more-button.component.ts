import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-read-more-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './read-more-button.component.html',
  styleUrl: './read-more-button.component.scss'
})
export class ReadMoreButtonComponent {
  @Input() link!: string;
  @Input() cta: boolean = false;
}
