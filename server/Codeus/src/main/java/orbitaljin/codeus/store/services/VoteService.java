package orbitaljin.codeus.store.services;

import jakarta.transaction.Transactional;
import orbitaljin.codeus.store.models.Post;
import orbitaljin.codeus.store.models.Vote;
import orbitaljin.codeus.store.repositories.PostRepository;
import orbitaljin.codeus.store.repositories.VoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VoteService {

    @Autowired
    private VoteRepository voteRepository;

    @Autowired
    private PostRepository postRepository;

    @Transactional
    public void upvote(String userId, String postId) {
        Vote existingVote = voteRepository.findByUserIdAndPostId(userId, postId);
        if (existingVote != null) {
            if (existingVote.getValue() == 1) {
                // User has already upvoted, delete the vote
                voteRepository.delete(existingVote);
                updatePostVoteCount(postId);
                return;
            } else {
                // User is changing from downvote to upvote
                existingVote.setValue(1);
            }
        } else {
            // User has not voted before
            existingVote = new Vote(userId, postId, 1);
        }

        voteRepository.save(existingVote);
        updatePostVoteCount(postId);
    }

    @Transactional
    public void downvote(String userId, String postId) {
        Vote existingVote = voteRepository.findByUserIdAndPostId(userId, postId);
        if (existingVote != null) {
            if (existingVote.getValue() == -1) {
                // User has already downvoted, delete the vote
                voteRepository.delete(existingVote);
                updatePostVoteCount(postId);
                return;
            } else {
                // User is changing from upvote to downvote
                existingVote.setValue(-1);
            }
        } else {
            // User has not voted before
            existingVote = new Vote(userId, postId, -1);
        }

        voteRepository.save(existingVote);
        updatePostVoteCount(postId);
    }

    @Transactional
    public void removeVote(String userId, String postId) {
        Vote existingVote = voteRepository.findByUserIdAndPostId(userId, postId);
        if (existingVote != null) {
            voteRepository.delete(existingVote);
            updatePostVoteCount(postId);
        }
    }

    private void updatePostVoteCount(String postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));
        int upvotes = voteRepository.countByPostIdAndValue(postId, 1);
        int downvotes = voteRepository.countByPostIdAndValue(postId, -1);
        post.setVoteCount((long)upvotes - downvotes);
        postRepository.save(post);
    }

    public List<Post> getUserUpvotedPosts(String userId) {
        List<Vote> votes = voteRepository.findByUserId(userId);
        // Return only posts that have been upvoted
        return postRepository.findAllById(votes.stream()
                .filter(vote -> vote.getValue() == 1)
                .map(Vote::getPostId)
                .toList()
        );
    }

    public List<Post> getUserDownvotedPosts(String userId) {
        List<Vote> votes = voteRepository.findByUserId(userId);
        // Return only posts that have been downvoted
        return postRepository.findAllById(votes.stream()
                .filter(vote -> vote.getValue() == -1)
                .map(Vote::getPostId)
                .toList()
        );
    }

    public boolean hasUpvoted(String userId, String postId) {
        Vote vote = voteRepository.findByUserIdAndPostId(userId, postId);
        return vote != null && vote.getValue() == 1;
    }

    public boolean hasDownvoted(String userId, String postId) {
        Vote vote = voteRepository.findByUserIdAndPostId(userId, postId);
        return vote != null && vote.getValue() == -1;
    }
}
