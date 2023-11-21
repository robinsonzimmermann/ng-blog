import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Post } from '../../core/model/post.model';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { PostUrlPipe } from '../../core/utils/post-url.pipe';

@Component({
  selector: 'app-post-featured',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule, PostUrlPipe],
  templateUrl: './post-featured.component.html',
  styleUrl: './post-featured.component.scss'
})
export class PostFeaturedComponent {
  @Input({ required:true }) post!: Post;
}
