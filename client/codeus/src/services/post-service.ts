import axios from "axios";
import { PostModel } from "./schema";

const endpoint: string = "http://127.0.0.1:8080/posts/";

export const fetchPost = async (id: string): Promise<PostModel> => {
  try {
    const response = await axios.get(endpoint + id);
    return response.data?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchPosts = async (): Promise<PostModel[]> => {
  try {
    const response = await axios.get(endpoint);
    return response.data?.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const fetchPostsByAuthorId = async (
  authorId: string,
): Promise<PostModel[]> => {
  try {
    const response = await axios.get(endpoint + "author/" + authorId);
    return response.data?.data;
  } catch (error) {
    console.error("Error fetch posts:", error);
    throw error;
  }
};

export const deletePost = async (id: string): Promise<void> => {
  try {
    await axios.delete(endpoint, { data: { id } });
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

export const createPost = async (data: PostModel): Promise<PostModel> => {
  try {
    const response = await axios.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};
