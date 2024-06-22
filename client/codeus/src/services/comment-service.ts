import axios from "axios";
import { CommentModel } from "./schema";

const endpoint: string = "http://127.0.0.1:8080/comments/";

export const fetchComment = async (id: string): Promise<CommentModel> => {
  try {
    const response = await axios.get(endpoint + id);
    console.log(response.data?.data);
    return response.data?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchComments = async (
  postId: string,
): Promise<CommentModel[]> => {
  try {
    const response = await axios.get(endpoint + "post/" + postId);
    return response.data?.data || null;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const deleteComment = async (id: string): Promise<void> => {
  try {
    await axios.delete(endpoint + id);
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

export const createComment = async (
  data: CommentModel,
): Promise<CommentModel> => {
  try {
    const response = await axios.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};
