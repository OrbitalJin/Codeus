// Post schema
export type PostModel = {
  id?: string;
  title: string;
  description: string;
  content: string;
  language: string;
  userId: string;
  author?: string; // user handle
  threadId?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type UserModel = {
  id: string;
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
