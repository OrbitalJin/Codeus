import axios from "axios";
import { PostModel } from "./schema";

const endpoint: string = "http://localhost:8080/votes";

export const getUserUpvoted = async (userId: string): Promise<PostModel[]> => {
  try {
    const response = await axios.get(`${endpoint}/upvotes/${userId}`);
    return response.data?.data;
  } catch (error) {
    console.log("Error getting user upvotes: ", error);
    throw error;
  }
};

export const upvotePost = async (
  postId: string,
  userId: string,
): Promise<boolean> => {
  try {
    await axios.post(`${endpoint}/upvote/${postId}/${userId}`, {
      data: { userId },
    });
    return true;
  } catch (error) {
    console.log("Error upvoting post:", error);
    throw error;
  }
};

export const downvotePost = async (
  postId: string,
  userId: string,
): Promise<boolean> => {
  try {
    await axios.post(`${endpoint}/downvote/${postId}/${userId}`, {
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

export const hasUpvoted = async (
  postId: string,
  userId: string,
): Promise<boolean> => {
  try {
    const response = await axios.get(`${endpoint}/upvoted/${postId}/${userId}`);
    return response.data?.data;
  } catch (error) {
    console.log("Error downvoting post:", error);
    throw error;
  }
};

export const hasDownvoted = async (
  postId: string,
  userId: string,
): Promise<boolean> => {
  try {
    const response = await axios.get(
      `${endpoint}/downvoted/${postId}/${userId}`,
    );
    return response.data?.data;
  } catch (error) {
    console.log("Error downvoting post:", error);
    throw error;
  }
};
