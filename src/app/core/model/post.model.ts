export interface Post {
  path: string;
  title: string;
  excerpt: string;
  teaser: string;
  date: string;
  author: string;
  permalink: string;
}

export interface Posts {
  posts: Post[];
  total: number;
}