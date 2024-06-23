import axios from "axios";
import { PostModel } from "./schema";

export default class VoteService {
  private static instance: VoteService;
  private endpoint: string = "http://localhost:8080/votes";

  private constructor() {}

  public static getInstance(): VoteService {
    if (!VoteService.instance) {
      VoteService.instance = new VoteService();
    }
    return VoteService.instance as VoteService;
  }

  public getUserUpvoted = async (userId: string): Promise<PostModel[]> => {
    try {
      const response = await axios.get(`${this.endpoint}/upvotes/${userId}`);
      return response.data?.data;
    } catch (error) {
      console.log("Error getting user upvotes: ", error);
      throw error;
    }
  };

  public upvotePost = async (
    postId: string,
    userId: string,
  ): Promise<boolean> => {
    try {
      await axios.post(`${this.endpoint}/upvote/${postId}/${userId}`, {
        data: { userId },
      });
      return true;
    } catch (error) {
      console.log("Error upvoting post:", error);
      throw error;
    }
  };

  public downvotePost = async (
    postId: string,
    userId: string,
  ): Promise<boolean> => {
    try {
      await axios.post(`${this.endpoint}/downvote/${postId}/${userId}`, {
        data: {
          userId,
        },
      });
      return true;
    } catch (error) {
      console.log("Error downvoting post:", error);
      throw error;
    }
  };

  public hasUpvoted = async (
    postId: string,
    userId: string,
  ): Promise<boolean> => {
    try {
      const response = await axios.get(
        `${this.endpoint}/upvoted/${postId}/${userId}`,
      );
      return response.data?.data;
    } catch (error) {
      console.log("Error downvoting post:", error);
      throw error;
    }
  };

  public hasDownvoted = async (
    postId: string,
    userId: string,
  ): Promise<boolean> => {
    try {
      const response = await axios.get(
        `${this.endpoint}/downvoted/${postId}/${userId}`,
      );
      return response.data?.data;
    } catch (error) {
      console.log("Error downvoting post:", error);
      throw error;
    }
  };
}
