import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-engineering-content',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './engineering-content.component.html',
  styleUrl: './engineering-content.component.scss'
})
export class EngineeringContentComponent {

}
