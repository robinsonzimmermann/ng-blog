import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsService } from '../../../core/services/posts.service';
import { BehaviorSubject, Observable, forkJoin, map, switchMap, tap } from 'rxjs';
import { Post, Posts } from '../../../core/model/post.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-post-grid',
  templateUrl: './post-grid.component.html',
  styleUrl: './post-grid.component.scss'
})
export class PostGridComponent {
  total!: number;
  postPerPage = this.postsService.postsPerPage;

  currentPage$$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  posts$: Observable<Post[]> = this.currentPage$$.pipe(
    switchMap((pageNumber) => this.postsService.getPosts(pageNumber)),
    tap(({ total }) => this.total = total),
    map(({ posts }) => posts),
  )
  constructor(private postsService: PostsService) {}

  navigate(page: PageEvent) {
    this.currentPage$$.next(page.pageIndex);
  }
}
