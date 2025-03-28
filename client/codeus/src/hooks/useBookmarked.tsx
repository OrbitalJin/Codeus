import BookmarkService from "@/services/bookmark-service";
import { PostModel } from "@/services/schema";
import { useEffect, useState } from "react";

const service = BookmarkService.getIntance();

export const useBookmarks = (userId: string) => {
  const [bookmarks, setBookmarks] = useState<PostModel[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const bookmarks = await service.fetchUserBookmarks(userId);
        setBookmarks(bookmarks);
      } catch (error) {
        setError(error ? true : false);
      }
    })();
    setLoading(false);
  }, [userId]);

  return {
    bookmarks,
    loading,
    error,
  };
};

export const useBookmark = (postId: string, userId: string) => {
  const [bookMarked, setBookmarked] = useState<boolean>(false);

  const toggleBookmark = async (postId: string, userId: string) => {
    service.bookmarkPost(postId, userId);
  };

  useEffect(() => {
    (async () => {
      setBookmarked(await service.isBookmarked(postId, userId));
    })();
  }, [postId, userId]);

  return {
    bookMarked,
    toggleBookmark,
  };
};
