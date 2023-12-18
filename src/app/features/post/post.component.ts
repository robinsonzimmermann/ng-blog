import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Observable, filter, map, switchMap } from 'rxjs';
import { Post } from '../../core/model/post.model';
import { PostsService } from '../../core/services/posts.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';
import { AuthorComponent } from '../../components/author/author.component';
import { MatChipsModule } from '@angular/material/chips';
import { PostItemComponent } from '../../components/post-item/post-item.component';
import { DividerComponent } from '../../components/divider/divider.component';
import { Category } from '../../core/model/categories.model';
import { TableOfContentComponent } from '../../components/table-of-content/table-of-content.component';
import { Header, HeaderNode } from '../../core/model/content.model';

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
    TableOfContentComponent,
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
  Category = Object.fromEntries(Object.entries(Category));

  tableOfContent: HeaderNode[] = [];


  constructor(
    private postsService: PostsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private markdownService: MarkdownService,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  ngOnInit() {
    this.markdownPath =
      `${this.activatedRoute.snapshot.url.map(({ path }) => path).join('/')}/post.md`;
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

  onLoad(markdown: string) {
    const regExp = new RegExp(/<h\d(.*?)<\/h\d>/gm);
    const matches = this.markdownService.parse(markdown).toString().match(regExp);

    let current: HeaderNode;
    this.tableOfContent = [];
    matches?.forEach((match) => {
      const div = this.document.createElement('div');
      div.innerHTML = match;
      const header: Header = {
        id: div.firstElementChild?.getAttribute('id') as string,
        heading: div.textContent as string,
        level: Number(div?.firstElementChild?.tagName.replace(/\D/g, '')),
      };
      if (!current || header.level >= current.level) {
        current = { ...header, children: []};
        this.tableOfContent.push(current);
        return;
      }
      current.children.push({ ...header, children: []});
    });

  }
}
