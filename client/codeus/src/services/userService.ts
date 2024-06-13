import axios from "axios";
import { UserModel } from "./schema";

const endpoint: string = "http://127.0.0.1:8080/users/";

export const fetchUsers = async (): Promise<UserModel[]> => {
  try {
    const response = await axios.get(endpoint);
    return response.data?.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const fetchUser = async (
  id: string | null,
): Promise<UserModel | null> => {
  if (!id) return null;
  try {
    const response = await axios.get(endpoint + id);
    return response.data?.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createUser = async (data: UserModel): Promise<UserModel> => {
  try {
    const response = await axios.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};
