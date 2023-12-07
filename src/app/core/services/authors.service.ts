import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author, AuthorsList } from '../model/author.model';
import { Observable, map, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor(private httpClient: HttpClient) {}

  getAuthors(): Observable<AuthorsList> {
    return this.httpClient.get<AuthorsList>('authors.json')
      .pipe(
        shareReplay(),
        map((authors) => Object.keys(authors).reduce((acc, curr) => ({
          ...acc,
          [curr]: {
            ...authors[curr],
            fullname: curr,
          }
        }), {})),
      );
  }

  getAuthorsDetails(postAuthors: string[]): Observable<Author[] | undefined> {
    return this.getAuthors().pipe(map((authors) => postAuthors.map((author) => authors[author])));
  }
}
