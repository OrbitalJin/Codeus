import axios from "axios";
import { PostModel } from "./schema";

export default class BookmarkService {
  private static instance: BookmarkService;
  private endpoint: string = "http://localhost:8080/bookmarks";

  private constructor() {}

  public static getIntance(): BookmarkService {
    if (!BookmarkService.instance) {
      BookmarkService.instance = new BookmarkService();
    }
    return BookmarkService.instance;
  }

  bookmarkPost = async (postId: string, userId: string): Promise<boolean> => {
    try {
      await axios.post(`${this.endpoint}/toggle/${postId}/${userId}`);
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  fetchUserBookmarks = async (userId: string): Promise<PostModel[]> => {
    try {
      const response = await axios.get(`${this.endpoint}/${userId}`);
      return response.data?.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  clearUserBookmarks = async (userId: string): Promise<boolean> => {
    try {
      await axios.delete(this.endpoint + "/" + userId);
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  isBookmarked = async (postId: string, userId: string): Promise<boolean> => {
    try {
      const response = await axios.get(
        `${this.endpoint}/isBookmarked/${postId}/${userId}`,
      );
      return response.data?.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}
