import axios from "axios";
import { PostModel } from "./schema";

export default class PostService {
  protected static instance: PostService;
  private endpoint: string = "http://127.0.0.1:8080/posts/";

  private constructor() {}

  public static getInstance(): PostService {
    if (!PostService.instance) {
      PostService.instance = new PostService();
    }
    return PostService.instance as PostService;
  }

  public fetchPost = async (id: string): Promise<PostModel> => {
    try {
      const response = await axios.get(this.endpoint + id);
      return response.data?.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  public fetchPosts = async (): Promise<PostModel[]> => {
    try {
      const response = await axios.get(this.endpoint);
      return response.data?.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  };

  public fetchPostsByThreadId = async (
    threadId: string,
  ): Promise<PostModel[]> => {
    try {
      const response = await axios.get(this.endpoint + "thread/" + threadId);
      return response.data?.data;
    } catch (error) {
      console.error("Error fetching posts for thread: ", threadId);
      throw error;
    }
  };

  public fetchPostsByAuthorId = async (
    authorId: string,
  ): Promise<PostModel[]> => {
    try {
      const response = await axios.get(this.endpoint + "author/" + authorId);
      return response.data?.data;
    } catch (error) {
      console.error("Error fetch posts:", error);
      throw error;
    }
  };

  public deletePost = async (id: string): Promise<void> => {
    try {
      await axios.delete(this.endpoint, { data: { id } });
    } catch (error) {
      console.error("Error deleting post:", error);
      throw error;
    }
  };

  public createPost = async (data: PostModel): Promise<PostModel> => {
    try {
      const response = await axios.post(this.endpoint, data);
      return response.data;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  };
}
