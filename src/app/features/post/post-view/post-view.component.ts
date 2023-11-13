import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { PostsService } from '../../../core/services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { Post } from '../../../core/model/post.model';

@Component({
  selector: 'app-post-view',
  standalone: true,
  imports: [CommonModule, MarkdownModule],
  templateUrl: './post-view.component.html',
  styleUrl: './post-view.component.scss'
})
export class PostViewComponent {

  post$: Observable<Post | undefined> = this.activatedRoute.paramMap.pipe(
    map((params) => params.get('permalink')),
    switchMap((permalink) => this.postsService.getPost(permalink))
  );
  path$: Observable<string | undefined> = this.post$.pipe(map((post) => post?.path));

  constructor(private postsService: PostsService, private activatedRoute: ActivatedRoute) {}

}
