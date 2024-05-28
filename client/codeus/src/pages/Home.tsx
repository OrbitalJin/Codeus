import LeftBar from "@/components/LeftBar";
import Post from "@/components/Post";
import PostModel from "@/models/Post";
import { useEffect, useState } from "react";

const Home: React.FC = () => {
    const [posts, setPosts] = useState<PostModel[]>([]);
    const [isLoadin, setIsLoading] = useState<boolean>(true);

    const fetchPosts = async () => {
        await fetch("http://localhost:8080/posts/").then(response =>
            response.json().then(data => {
                setIsLoading(false);
                setPosts(data?.data);
            })
        );
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="flex flex-row" id="left-bar">
            <div className="flex flex-col place-content-center justify-center basis-1/2 space-y-1 px-1 py-1  bg-red-400">
                {posts.map(post => (
                    <Post key={post.id} post={post} />
                ))}
            </div>
            <div className="basis-1/3 bg-green-400">
                {isLoadin && <div>Loading...</div>}
                <p>hi</p>
                <p>hi</p>
                <p>hi</p>
                <p>hi</p>
                <p>hi</p>
            </div>
        </div>
    );
};

export default Home;
