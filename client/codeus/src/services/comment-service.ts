import axios from "axios";
import { CommentModel } from "./schema";

export default class CommentService {
  private static instance: CommentService;
  private endpoint: string = "http://127.0.0.1:8080/comments/";

  private constructor() {}

  public static getInstance(): CommentService {
    if (!CommentService.instance) {
      CommentService.instance = new CommentService();
    }
    return CommentService.instance as CommentService;
  }

  public fetchUserComments = async (
    userId: string,
  ): Promise<CommentModel[]> => {
    try {
      const response = await axios.get(this.endpoint + "user/" + userId);
      return response.data?.data || null;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  };

  public fetchComments = async (postId: string): Promise<CommentModel[]> => {
    try {
      const response = await axios.get(this.endpoint + "post/" + postId);
      return response.data?.data || null;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  };

  public deleteComment = async (id: string): Promise<void> => {
    try {
      await axios.delete(this.endpoint + id);
    } catch (error) {
      console.error("Error deleting post:", error);
      throw error;
    }
  };

  public createComment = async (data: CommentModel): Promise<CommentModel> => {
    try {
      const response = await axios.post(this.endpoint, data);
      return response.data;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  };
}
