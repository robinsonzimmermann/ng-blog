import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, filter, map, switchMap, tap } from 'rxjs';
import { Post } from '../../core/model/post.model';
import { PostsService } from '../../core/services/posts.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { Author } from '../../core/model/author.model';
import { AuthorsService } from '../../core/services/authors.service';
import { AuthorComponent } from '../../components/author/author.component';
import { MatChipsModule } from '@angular/material/chips';
import { PostItemComponent } from '../../components/post-item/post-item.component';
import { DividerComponent } from '../../components/divider/divider.component';

@Component({
  selector: 'blog-post',
  standalone: true,
  imports: [
    CommonModule,
    MarkdownModule,
    AuthorComponent,
    MatChipsModule,
    RouterModule,
    DividerComponent,
    PostItemComponent,
    MarkdownModule,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  permalink$ = this.activatedRoute.paramMap.pipe();

  post$: Observable<Post | undefined> = this.activatedRoute.url.pipe(
    map((segments) => segments.map(({ path }) => path).join('/')),
    switchMap((permalink) => this.postsService.getPost(permalink))
  );
  authors$: Observable<Author[] | undefined> = this.post$.pipe(
    filter(Boolean),
    switchMap(({ authors }) => this.authorsService.getAuthorsDetails( authors )),
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
