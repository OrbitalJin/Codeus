import VoteService from "@/services/vote-service";
import { useEffect, useState } from "react";

const useVotes = (postId: string, userId: string) => {
  const [upvoted, setUpvoted] = useState<boolean>(false);
  const [downvoted, setDownvoted] = useState<boolean>(false);
  const upvoteService = VoteService.getInstance();

  useEffect(() => {
    (async () => {
      setUpvoted(await upvoteService.hasUpvoted(postId, userId));
    })();

    (async () => {
      setDownvoted(await upvoteService.hasDownvoted(postId, userId));
    })();
  }, [postId, userId, upvoteService]);

  return {
    upvoted,
    downvoted,
  };
};

export default useVotes;
