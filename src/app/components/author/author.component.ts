import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Author } from '../../core/model/author.model';

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './author.component.html',
  styleUrl: './author.component.scss'
})
export class AuthorComponent {
  @Input() author!: Author;
  @Input() size: string = 'sm';
}
