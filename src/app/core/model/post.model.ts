export interface Post {
  path: string;
  title: string;
  excerpt: string;
  teaser: string;
  date: string;
  author: string;
  permalink: string;
  featured?: boolean;
  categories: string[];
}

export interface Posts {
  highlightedPost: Post;
  posts: Post[];
  total: number;
}