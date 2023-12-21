import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Observable, filter, map, switchMap, tap, withLatestFrom } from 'rxjs';
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
import { HeaderNode } from '../../core/model/content.model';

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
export class PostComponent {
  post$: Observable<Post | undefined> = this.activatedRoute.url.pipe(
    map((segments) => segments.map(({ path }) => path).join('/')),
    switchMap((permalink) => this.postsService.getPost(permalink)),
  );
  markdown$: Observable<string> = this.activatedRoute.url.pipe(
    map((segments) => `${segments.map(({ path }) => path).join('/')}/post.md`),
    switchMap((link) => this.markdownService.getSource(link)),
    withLatestFrom(this.post$),
    tap(([markdown, post]) => this.createTree(markdown, post?.title || 'Top')),
    map(([markdown]) => markdown)
  );
  relatedPosts$: Observable<Post[]> = this.post$.pipe(
    filter(Boolean),
    switchMap(post =>
      this.postsService.getPosts(0, 3, false, (_post: Post) =>
        post.title !== _post.title && (post.category === _post.category || post.tags.some((tag) => _post.tags.includes(tag))))),
    map(({ posts }) => posts),
  );
  Category = Object.fromEntries(Object.entries(Category));
  headers: HeaderNode[] = [];
  currentSection: string = 'post-header';

  constructor(
    private postsService: PostsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private markdownService: MarkdownService,
    @Inject(DOCUMENT) private document: Document,
    private cd: ChangeDetectorRef,
  ) {
    this.markdownService.getSource
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

  onLoad(markdown: string, post: Post) {
    this.createTree(this.markdownService.parse(markdown).toString(), post.title);
    this.cd.detectChanges();
  }

  private createTree(markdown: string, rootTitle: string) {
    const regExp = new RegExp(/<h\d(.*?)<\/h\d>/gm);
    const matches = this.markdownService.parse(markdown).toString().match(regExp);
    const root: HeaderNode = { id: 'post-header', heading: rootTitle, level: 1, children: [] };

    const nodes: Element[] = matches?.map((raw) => {
      const node = this.document.createElement('div');
      node.innerHTML = raw;
      return node.firstElementChild as Element;
    }) ?? [];

    const headings = nodes.map((node) => ({
      id: node.getAttribute('id') as string,
      heading: node.textContent as string,
      level: Number(node.tagName.replace(/\D/g, '')),
      children: [],
    }));
      
    this.headers = headings.reduce(((hierarchy, heading) => {      
      while (hierarchy.length >= heading.level) {
        hierarchy.pop();
      }
    
      hierarchy[hierarchy.length - 1].children.push(heading);
      hierarchy.push(heading);

      return hierarchy;
    }), [root]);
  }
}
