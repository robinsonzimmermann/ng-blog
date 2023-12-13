import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../model/post.model';
import { getPermalink } from '@blog/utils';

@Pipe({
  name: 'postUrl',
  standalone: true
})
export class PostUrlPipe implements PipeTransform {
  transform(post: Post): string {
    return getPermalink(post.title, post.date ? new Date(post.date) : undefined, post.category, post.article);
  }
}
