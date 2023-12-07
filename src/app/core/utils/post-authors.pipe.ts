import { Pipe, PipeTransform } from '@angular/core';
import { Author, AuthorsList } from '../model/author.model';

@Pipe({
  name: 'postAuthors',
  standalone: true
})
export class PostAuthorsPipe implements PipeTransform {

  transform(authors: AuthorsList, postAuthors: string[]): Author[] {
    return postAuthors.map((authorName) => authors[authorName]);
  }

}
