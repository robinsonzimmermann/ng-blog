export interface Post {
  path: string;
  title: string;
  excerpt: string;
  teaser: string;
  date: string | undefined;
  authors: string[];
  permalink: string;
  featured?: boolean;
  category: string;
  tags: string[];
  readingTime: string;
}

export interface Posts {
  highlightedPost: Post;
  posts: Post[];
  total: number;
}