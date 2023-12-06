import { Injectable } from '@angular/core';
import { Observable, Subject, filter, map, shareReplay, tap } from 'rxjs';
import { Post, Posts } from '../model/post.model';
import { HttpClient } from '@angular/common/http';
import { getPermalink } from '@blog/utils';

const POSTS_PER_PAGE = 9;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private httpClient: HttpClient) {}

  private getAllPosts() {
    return this.httpClient.get<Post[]>('meta.json').pipe(
      map((posts) => posts.map((post) =>
        ({
          ...post,
          permalink: getPermalink(post.title, post.date ? new Date(post.date) : undefined)
        })
      )),
    );
  }

  getPosts(pageNumber: number = 0, categories: string[]): Observable<Posts> {
    return this.getAllPosts().pipe(
      map((posts) => {
        const highlightedPost = posts.find((featured) => featured) || posts[0];
        const categorizedPosts = posts
          .filter((post) => categories.length === 0 || categories.some((category) => category === post.category))
          .filter(({ permalink }) => highlightedPost.permalink !== permalink);
        const paginatedPosts = categorizedPosts
          .slice(pageNumber * POSTS_PER_PAGE, pageNumber * POSTS_PER_PAGE + POSTS_PER_PAGE)

        return {
          highlightedPost,
          posts: paginatedPosts,
          total: categorizedPosts.length,
        };
      }),
    );
  }

  getPost(permalink: string | null): Observable<Post | undefined> {
    return this.getAllPosts().pipe(
      map((posts) => posts.find((post) => post.permalink === permalink))
    )
  }

  getCategories(): Observable<string[]> {
    return this.getAllPosts().pipe(
      map((posts) => [...new Set(posts.reduce((acc: string[], curr: Post) => [...acc, curr.category], []))])
    )
  }

  getRelatedPosts(post: Post): Observable<Post[]> {
    return this.getAllPosts()
      .pipe(
        map((posts) => posts.filter(({ category, title }) => category === post.category && title !== post.title)),
        map((posts) => posts.slice(0, 3))
      )
  }

  get postsPerPage() {
    return POSTS_PER_PAGE;
  }
}
