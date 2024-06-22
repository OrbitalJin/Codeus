export type CommentModel = {
  id: string;
  content: string;
  authorId: string;
  postId: string;
  createdAt?: string;
  updatedAt?: string;
};

export type BookmarkModel = {
  id: string;
  userId: string;
  postId: string;
};

export type PostModel = {
  id?: string;
  title: string;
  theme: string;
  description: string;
  voteCount: number;
  content: string;
  language: string;
  authorId: string; // user handle
  createdAt?: string;
  updatedAt?: string;
};

export type UserModel = {
  id: string;
  bio?: string;
  email: string;
  handle: string;
  username: string;
  createdAt?: string;
  updatedAt?: string;
};

export type RegisterPayload = {
  email: string;
  handle: string;
  username: string;
  password: string;
  confirmPassword: string;
};
