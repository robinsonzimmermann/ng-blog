import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Post, Posts } from '../model/post.model';
import meta from '../../../posts/meta.json';

const POSTS_PER_PAGE = 9;

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  getPosts(pageNumber: number = 0): Observable<Posts> {
    return of(meta).pipe(
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
