import axios from "axios";
import { UserModel } from "./schema";

export default class UserService {
  private static instance: UserService;
  private endpoint: string = "http://127.0.0.1:8080/users/";

  private constructor() {}

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance as UserService;
  }

  public async fetchUsers(): Promise<UserModel[]> {
    try {
      const response = await axios.get(this.endpoint);
      return response.data?.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  public async fetchUser(id: string | null): Promise<UserModel | null> {
    if (!id) return null;
    try {
      const response = await axios.get(this.endpoint + id);
      return response.data?.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }

  public async fetchUserByHandle(
    handle: string | null,
  ): Promise<UserModel | null> {
    if (!handle) return null;
    try {
      const response = await axios.get(this.endpoint + "handle/" + handle);
      return response.data?.data;
    } catch (error) {
      console.error("Error fetching user by handle:", error);
      throw error;
    }
  }

  public async createUser(data: UserModel): Promise<UserModel> {
    try {
      const response = await axios.post(this.endpoint, data);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  public async updateUser(user: UserModel): Promise<UserModel> {
    try {
      const response = await axios.patch(this.endpoint, user);
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }
}
