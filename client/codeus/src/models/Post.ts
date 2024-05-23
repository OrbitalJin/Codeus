type PostModel = {
    id: number;
    threadId: number;
    userId: number;
    title: string;
    description?: string;
    content: string;
    language: string;
};

export default PostModel;
