import { hasDownvoted, hasUpvoted } from "@/services/upvoteService";
import { useEffect, useState } from "react";

const useVotes = (postId: string, userId: string) => {
  const [upvoted, setUpvoted] = useState<boolean>(false);
  const [downvoted, setDownvoted] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setUpvoted(await hasUpvoted(postId, userId));
    })();

    (async () => {
      setDownvoted(await hasDownvoted(postId, userId));
    })();
  }, [postId, userId]);

  return {
    upvoted,
    downvoted,
  };
};

export default useVotes;
