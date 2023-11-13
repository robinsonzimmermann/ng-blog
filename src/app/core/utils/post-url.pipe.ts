import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../model/post.model';

@Pipe({
  name: 'postUrl',
  standalone: true
})
export class PostUrlPipe implements PipeTransform {

  transform(post: Post): string {
    const date = new Date(post.date);
    const permalink = post.permalink;
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}/${permalink}`;
  }

}
