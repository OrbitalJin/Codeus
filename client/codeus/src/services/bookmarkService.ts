import axios from "axios";
import { PostModel } from "./schema";

const endpoint: string = "http://localhost:8080/bookmarks";

export const bookmarkPost = async (
  postId: string,
  userId: string,
): Promise<boolean> => {
  try {
    await axios.post(`${endpoint}/toggle/${postId}/${userId}`);
    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchUserBookmarks = async (
  userId: string,
): Promise<PostModel[]> => {
  try {
    const response = await axios.get(`${endpoint}/${userId}`);
    return response.data?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const isBookmarked = async (
  postId: string,
  userId: string,
): Promise<boolean> => {
  try {
    const response = await axios.get(
      `${endpoint}/isBookmarked/${postId}/${userId}`,
    );
    return response.data?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
