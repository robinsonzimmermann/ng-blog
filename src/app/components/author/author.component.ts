import { Component, Input } from '@angular/core';
import { Author } from '../../core/model/author.model';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'blog-author',
  standalone: true,
  imports: [NgStyle, NgClass],
  templateUrl: './author.component.html',
  styleUrl: './author.component.scss'
})
export class AuthorComponent {
  @Input('author') set _author(value: Author | string) {
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
