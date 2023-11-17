import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Post, Posts } from '../model/post.model';
import { HttpClient } from '@angular/common/http';

const POSTS_PER_PAGE = 9;

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private featuredPost$$ = new BehaviorSubject<Post | undefined>(undefined);
  public featuredPost$ = this.featuredPost$$.asObservable();

  constructor(private httpClient: HttpClient) {}

  getPosts(pageNumber: number = 0): Observable<Posts> {
    return this.httpClient.get<Post[]>('meta.json').pipe(
      tap((posts) => this.featuredPost$$.next(posts.find(({ featured }) => featured) ?? posts[0])),
      map((posts) => posts.filter(({ permalink }) => this.featuredPost$$.value?.permalink !== permalink)),
      map((posts) => ({
        posts: posts.slice(pageNumber * POSTS_PER_PAGE, pageNumber * POSTS_PER_PAGE + POSTS_PER_PAGE),
        total: posts.length,
      }))
    );
  }

  getPost(permalink: string | null): Observable<Post | undefined> {
    return this.getPosts().pipe(
      map(({ posts }) => posts.find((post) => post.permalink === permalink))
    )
  }

  get postsPerPage() {
    return POSTS_PER_PAGE;
  }
}
