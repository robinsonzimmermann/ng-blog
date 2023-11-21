export interface Author {
  avatar: string;
  fullname: string;
  role: string;
}

export interface AuthorsList {
  [id: string]: Author;
}