import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-engineering-content',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatRippleModule],
  templateUrl: './engineering-content.component.html',
  styleUrl: './engineering-content.component.scss'
})
export class EngineeringContentComponent {
  navigate() {
  }
}
