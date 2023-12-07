import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, combineLatest, switchMap, tap } from 'rxjs';
import { Posts } from '../../core/model/post.model';
import { PostsService } from '../../core/services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PostFeaturedComponent } from '../../components/post-featured/post-featured.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EngineeringContentComponent } from '../../components/engineering-content/engineering-content.component';
import { CategoriesComponent } from '../../components/categories/categories.component';
import { PostItemComponent } from '../../components/post-item/post-item.component';
import { PostUrlPipe } from '../../core/utils/post-url.pipe';
import { JobsComponent } from '../../components/jobs/jobs.component';
import { HttpUrlEncodingCodec } from '@angular/common/http';
import { AuthorsList } from '../../core/model/author.model';
import { AuthorsService } from '../../core/services/authors.service';
import { DividerComponent } from '../../components/divider/divider.component';
import { PostAuthorsPipe } from '../../core/utils/post-authors.pipe';

@Component({
  selector: 'blog-home',
  standalone: true,
  imports: [
    CommonModule,
    PostFeaturedComponent,
    EngineeringContentComponent,
    CategoriesComponent,
    PostItemComponent,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    PostUrlPipe,
    JobsComponent,
    DividerComponent,
    PostAuthorsPipe,
  ],
  providers: [HttpUrlEncodingCodec],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  total!: number;
  postPerPage = this.postsService.postsPerPage;
  currentPage$$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  categories$$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  loading = true;
  posts$: Observable<Posts> = combineLatest([this.currentPage$$, this.categories$$]).pipe(
    switchMap(([pageNumber, categories]) => this.postsService.getPosts(pageNumber, categories)),
    tap(({ total }) => {
      this.total = total;
      this.loading = false;
    }),
  );
  authors$: Observable<AuthorsList> = this.authorsService.getAuthors();
  categories$: Observable<string[]> = this.postsService.getCategories();

  constructor(
    private postsService: PostsService,
    private authorsService: AuthorsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private urlEncoder: HttpUrlEncodingCodec,
  ) {}

  ngOnInit(): void {
    const page = this.activatedRoute.snapshot.queryParamMap.get('p');
    const categories = this.activatedRoute.snapshot.queryParamMap.get('categories');
    if (page && typeof Number(page) === 'number') {
      this.currentPage$$.next(Number(page) - 1)
    }
    if (categories) {
      this.categories$$.next(this.urlEncoder.decodeValue(categories).split(','));
    }
  }

  navigate(page: PageEvent) {
    this.currentPage$$.next(page.pageIndex);
    this.router.navigate(
      [], 
      {
        relativeTo: this.activatedRoute,
        queryParams: {
          p: page.pageIndex + 1,
        }, 
        queryParamsHandling: 'merge',
      }
    );
  }

  filterCategory(categories: string[]) {
    this.categories$$.next(categories);
    this.router.navigate(
      [], 
      {
        relativeTo: this.activatedRoute,
        queryParams: {
          categories: categories.join(','),
        }, 
        queryParamsHandling: 'merge',
      }
    );
  }
}
