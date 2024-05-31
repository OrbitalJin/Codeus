import { useEffect, useState } from "react";
import { PostModel } from "@/services/schema";
import { deletePost, fetchPosts } from "@/services/postService";

export const usePosts = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [posts, setPosts] = useState<PostModel[]>([]);
    const [error, setError] = useState<boolean>(false);

    const getPosts = async () => {
        try {
            const data = await fetchPosts();
            setPosts(data.reverse());
        } catch (error) {
            console.error("Failed to fetch posts", error);
            setError(true);
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        try {
            await deletePost(id);
            setPosts(posts.filter((post) => post.id !== id));
        } catch (error) {
            console.error("Failed to delete post", error);
            setError(true);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    return {
        loading,
        posts,
        error,
        handleDelete,
    };
};
