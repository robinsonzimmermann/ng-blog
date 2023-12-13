import { Injectable } from '@angular/core';
import { Observable, map, shareReplay, tap, withLatestFrom } from 'rxjs';
import { Post, Posts } from '../model/post.model';
import { HttpClient } from '@angular/common/http';
import { getPermalink } from '@blog/utils';
import { AuthorsService } from './authors.service';
import { Category } from '../model/categories.model';

const POSTS_PER_PAGE = 9;

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private cached: Observable<Post[]> = this.httpClient.get<Post[]>('meta.json').pipe(shareReplay());

  constructor(
    private httpClient: HttpClient,
    private authorsService: AuthorsService
  ) {}

  getAllPosts(): Observable<Post[]> {
    return this.cached; 
  }

  getHighlightedPost(): Observable<Post | undefined> {
    return this.getAllPosts().pipe(map((posts) => posts.find((featured) => featured) || posts[0]));
  }

  getPosts(
    offset: number = 0,
    size: number = POSTS_PER_PAGE,
    filterFeatured: boolean = true,
    filterFn?: (posts: Post) => boolean,
  ): Observable<Posts> {
    return this.getAllPosts().pipe(
      withLatestFrom(
        this.getHighlightedPost(),
        this.authorsService.getAuthors(),
      ),
      map(([posts, featured, authors]) => {
        let filteredPosts = posts;
        if (filterFeatured) {
          filteredPosts = filteredPosts.filter(({ title }) => title !== featured?.title);
        }
        if (typeof filterFn === 'function') {
          filteredPosts = filteredPosts.filter(filterFn);
        }
        const paginatedPosts = filteredPosts
          .slice(offset * size, offset * size + size);

        return {
          posts: paginatedPosts.map((post) => ({
            ...post,
            authors: post.authors.map(author => typeof author === 'string' ? (authors[author] || author) : author )
          })),
          total: filteredPosts.length,
          perPage: size,
        };
      }),
    );
  }

  getPost(permalink: string | null): Observable<Post | undefined> {
    return this.getAllPosts().pipe(
      map((posts) => posts.find((post) =>
        getPermalink(post.title, post.date ? new Date(post.date) : undefined, post.category, post.article) === permalink,))
    )
  }

  getCategories(): Observable<Category[]> {
    return this.getAllPosts().pipe(
      map((posts) => [...new Set(posts.reduce((acc: Category[], curr: Post) => [...acc, curr.category], []))])
    )
  }

  getRelatedPosts(post: Post): Observable<Post[]> {
    return this.getAllPosts()
      .pipe(
        map((posts) => posts.filter(({ category, title }) => category === post.category && title !== post.title)),
        map((posts) => posts.slice(0, 3))
      )
  }
}
