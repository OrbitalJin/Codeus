import axios from "axios";

const endpoint: string = "http://127.0.0.1:8080/upvotes/";

export const upvotePost = async (
  postId: string,
  userId: string,
): Promise<boolean> => {
  try {
    await axios.post(endpoint + postId + "/" + userId, {
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
    await axios.delete(endpoint + postId + "/" + userId, {
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
