import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, filter, map, switchMap } from 'rxjs';
import { Post } from '../../core/model/post.model';
import { PostsService } from '../../core/services/posts.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { Author } from '../../core/model/author.model';
import { AuthorsService } from '../../core/services/authors.service';
import { AuthorComponent } from '../../components/author/author.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { PostItemComponent } from '../../components/post-item/post-item.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommonModule,
    MarkdownModule,
    AuthorComponent,
    MatChipsModule,
    RouterModule,
    MatDividerModule,
    PostItemComponent,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  post$: Observable<Post | undefined> = this.activatedRoute.paramMap.pipe(
    map((params) => params.get('permalink')),
    switchMap((permalink) => this.postsService.getPost(permalink))
  );
  path$: Observable<string | undefined> = this.post$.pipe(map((post) => post?.path));
  author$: Observable<Author | undefined> = this.post$.pipe(
    filter(Boolean),
    switchMap(({ author }) => this.authorsService.getAuthorDetails( author )),
  )

  relatedPosts$: Observable<Post[]> = this.post$.pipe(
    filter(Boolean),
    switchMap(post => this.postsService.getRelatedPosts(post))
  );

  constructor(
    private postsService: PostsService,
    private activatedRoute: ActivatedRoute,
    private authorsService: AuthorsService,
    private router: Router,
  ) {}

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
