// Post schema
export type PostModel = {
  id?: string;
  title: string;
  theme: string;
  description: string;
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
