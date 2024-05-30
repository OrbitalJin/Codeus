// Post schema
export type Post = {
    id: string;
    title: string;
    description: string;
    content: string;
    language: string;
    userId: string;
    threadId: string;
    createdAt: string;
    updatedAt: string;
};

export type User = {
    id: string;
    username: string;
    email?: string;
    createdAt?: string;
    updatedAt?: string;
};
