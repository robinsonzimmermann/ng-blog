import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, switchMap, tap } from 'rxjs';
import { Post, Posts } from '../../core/model/post.model';
import { PostsService } from '../../core/services/posts.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PostFeaturedComponent } from '../../components/post-featured/post-featured.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EngineeringContentComponent } from '../../components/engineering-content/engineering-content.component';
import { PostItemComponent } from '../../components/post-item/post-item.component';
import { PostUrlPipe } from '../../core/utils/post-url.pipe';
import { JobsComponent } from '../../components/jobs/jobs.component';
import { AuthorsList } from '../../core/model/author.model';
import { AuthorsService } from '../../core/services/authors.service';
import { DividerComponent } from '../../components/divider/divider.component';
import { PostAuthorsPipe } from '../../core/utils/post-authors.pipe';
import { GradientComponent } from '../../components/gradient/gradient.component';
import { CategoriesTabComponent } from '../categories-tab/categories-tab.component';
import { PostsListComponent } from '../../components/posts-list/posts-list.component';
import { NavigationService } from '../../core/services/navigation.service';

@Component({
  selector: 'blog-home',
  standalone: true,
  imports: [
    CommonModule,
    PostFeaturedComponent,
    EngineeringContentComponent,
    CategoriesTabComponent,
    PostItemComponent,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    PostUrlPipe,
    JobsComponent,
    DividerComponent,
    PostAuthorsPipe,
    GradientComponent,
    PostsListComponent,
  ],
  providers: [NavigationService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  currentPage$ = this.navigationService.currentPage$;
  featured$: Observable<Post | undefined> = this.postsService.getHighlightedPost();
  posts$: Observable<Posts> = this.currentPage$
    .pipe(switchMap((page) => this.postsService.getPosts(page, undefined, undefined, this.filterSpecialPosts.bind(this))));
  authors$: Observable<AuthorsList> = this.authorsService.getAuthors();
  categories$: Observable<string[]> = this.postsService.getCategories();

  @ViewChildren(PostsListComponent, { read: ElementRef<PostsListComponent> })
  anchor!: QueryList<ElementRef<PostsListComponent>>;

  constructor(
    private postsService: PostsService,
    private authorsService: AuthorsService,
    private navigationService: NavigationService,
  ) {}

  navigate(page: PageEvent) {
    this.navigationService.navigate(page.pageIndex, this.anchor.first);
  }

  private filterSpecialPosts(post: Post): boolean {
    return !['principles'].includes(post.category);
  }
}
