import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Author } from '../../core/model/author.model';

@Component({
  selector: 'blog-author',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './author.component.html',
  styleUrl: './author.component.scss'
})
export class AuthorComponent {
  @Input('author') set _author(value: Author | string) {
    console.log(value);
    if (typeof value === 'string') {
      this.author = {
        fullname: value,
        avatar: '',
        role: ''
      }
    } else {
      this.author = value;
    }
  };
  @Input() size: string = 'sm';

  author!: Author;
}
