import { Author } from "./author.model";
import { Category } from "./categories.model";

export interface Post {
  path: string;
  title: string;
  excerpt: string;
  teaser: string;
  date: string | undefined;
  authors: Array<Author | string>;
  permalink: string;
  featured?: boolean;
  category: Category;
  tags: string[];
  readingTime: string;
}

export interface Posts {
  posts: Post[];
  total: number;
  perPage: number;
}