import axios from "axios";
import { ThreadModel } from "./schema";

// This is the thread service which will act as a proxy between the front-end and back-end
export default class ThreadService {
  private static instance: ThreadService;
  private endpoint: string = "http://localhost:8080/threads/";

  private constructor() {}

  public static getInstance(): ThreadService {
    if (!ThreadService.instance) {
      ThreadService.instance = new ThreadService();
    }
    return ThreadService.instance as ThreadService;
  }

  public fetchThreads = async (): Promise<ThreadModel[]> => {
    try {
      const response = await axios.get(this.endpoint);
      return response.data?.data;
    } catch (error) {
      console.log("Error fetching the thread");
      throw error;
    }
  };

  public async fetchThread(id: string): Promise<ThreadModel> {
    try {
      const response = await axios.get(this.endpoint + id);
      return response.data?.data;
    } catch (error) {
      console.log("Error fetching the thread: " + id);
      throw error;
    }
  }

  public async createThread(data: ThreadModel): Promise<ThreadModel> {
    try {
      const response = await axios.post(this.endpoint, data);
      return response.data?.data;
    } catch (error) {
      console.log("Error creating the thread: " + data.title);
      throw error;
    }
  }

  public async deleteThread(id: string): Promise<boolean> {
    try {
      await axios.delete(this.endpoint + id);
      return true;
    } catch (error) {
      console.log("Error deleting the thread: " + id);
      throw error;
    }
  }
}
