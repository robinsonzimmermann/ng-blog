import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, filter, map, switchMap, tap } from 'rxjs';
import { Post } from '../../core/model/post.model';
import { PostsService } from '../../core/services/posts.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';
import { Author } from '../../core/model/author.model';
import { AuthorsService } from '../../core/services/authors.service';
import { AuthorComponent } from '../../components/author/author.component';
import { MatChipsModule } from '@angular/material/chips';
import { PostItemComponent } from '../../components/post-item/post-item.component';
import { DividerComponent } from '../../components/divider/divider.component';
import { Category } from '../../core/model/categories.model';

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
export class PostComponent implements OnInit {
  markdownPath!: string;
  post$: Observable<Post | undefined> = this.activatedRoute.url.pipe(
    map((segments) => segments.map(({ path }) => path).join('/')),
    switchMap((permalink) => this.postsService.getPost(permalink))
  );
  relatedPosts$: Observable<Post[]> = this.post$.pipe(
    filter(Boolean),
    switchMap(post =>
      this.postsService.getPosts(0, 3, false, (_post: Post) =>
        post.title !== _post.title && (post.category === _post.category || post.tags.some((tag) => _post.tags.includes(tag))))),
    map(({ posts }) => posts),
  );
  Category = Object.fromEntries(Object.entries(Category))

  constructor(
    private postsService: PostsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private markdownService: MarkdownService
  ) {
    this.markdownService.renderer.image = (href: string, title: string, text: string) => {
      return `
        <figure>
          <img src="${href}" />
          <figcaption>${text}</figcaption>
        </figure>
      `
    }
  }

  ngOnInit() {
    this.markdownPath =
      `${this.activatedRoute.snapshot.url.map(({ path }) => path).join('/')}/post.md`;
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
