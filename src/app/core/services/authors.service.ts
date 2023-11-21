import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author, AuthorsList } from '../model/author.model';
import { Observable, map, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor(private httpClient: HttpClient) {}

  getAuthors(): Observable<AuthorsList> {
    return this.httpClient.get<AuthorsList>('authors/meta.json')
      .pipe(shareReplay());
  }

  getAuthorDetails(authorId: string): Observable<Author | undefined> {
    return this.getAuthors().pipe(map((authors) => authors[authorId]));
  }
}
