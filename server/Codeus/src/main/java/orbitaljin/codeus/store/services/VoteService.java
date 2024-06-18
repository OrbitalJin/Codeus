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
        if (hasUpvoted(userId, postId) || hasDownvoted(userId, postId)) {
            if (hasDownvoted(userId, postId)) removeUpvote(userId, postId);
            if (hasUpvoted(userId, postId)) removeDownvote(userId, postId);
            return;
        }
        voteRepository.save(new Vote(userId, postId, 1));
        Post post = postRepository.findById(postId).get();
        post.setVoteCount(post.getVoteCount() + 1);
        postRepository.save(post);
    }

    @Transactional
    public void removeUpvote(String userId, String postId) {
        voteRepository.deleteByUserIdAndPostId(userId, postId);
        Post post = postRepository.findById(postId).get();
        post.setVoteCount(post.getVoteCount() - 1);
        postRepository.save(post);
    }

    @Transactional
    public void downvote(String userId, String postId) {
        if (hasDownvoted(userId, postId) || hasUpvoted(userId, postId)) {
            if (hasUpvoted(userId, postId)) removeUpvote(userId, postId);
            if (hasDownvoted(userId, postId)) removeDownvote(userId, postId);
            return;
        }

        voteRepository.save(new Vote(userId, postId, -1));
        Post post = postRepository.findById(postId).get();
        post.setVoteCount(post.getVoteCount() -1 );
        postRepository.save(post);
    }

    @Transactional
    public void removeDownvote(String userId, String postId) {
        voteRepository.deleteByUserIdAndPostId(userId, postId);
        Post post = postRepository.findById(postId).get();
        post.setVoteCount(post.getVoteCount() + 1);
        postRepository.save(post);
    }

    @Transactional
    public boolean hasUpvoted(String userId, String postId) {
        Vote vote = voteRepository.findByUserIdAndPostId(userId, postId);
        return vote != null && vote.getValue() == 1;
    }

    @Transactional
    public boolean hasDownvoted(String userId, String postId) {
        Vote vote = voteRepository.findByUserIdAndPostId(userId, postId);
        return vote != null && vote.getValue() == -1;
    }

    @Transactional
    public List<Vote> getUpvotesByUserId(String userId) {
        return voteRepository.findByUserId(userId);
    }
}
