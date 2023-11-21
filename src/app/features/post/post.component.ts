import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map, switchMap } from 'rxjs';
import { Post } from '../../core/model/post.model';
import { PostsService } from '../../core/services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, MarkdownModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  post$: Observable<Post | undefined> = this.activatedRoute.paramMap.pipe(
    map((params) => params.get('permalink')),
    switchMap((permalink) => this.postsService.getPost(permalink))
  );
  path$: Observable<string | undefined> = this.post$.pipe(map((post) => post?.path));

  constructor(private postsService: PostsService, private activatedRoute: ActivatedRoute) {}
}
