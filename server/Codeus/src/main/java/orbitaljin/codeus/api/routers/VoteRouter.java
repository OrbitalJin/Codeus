package orbitaljin.codeus.api.routers;

import orbitaljin.codeus.api.APIResponse;
import orbitaljin.codeus.store.services.VoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/votes")
public class VoteRouter {
    @Autowired
    private VoteService service;

    @PostMapping("upvote/{postId}/{userId}")
    public APIResponse<?> upvote(@PathVariable String postId, @PathVariable String userId){
        // Check if the post id is null
        if (postId == null) return new APIResponse<>(
                HttpStatus.BAD_REQUEST,
                "Post ID cannot be null"
        );

        // Check if the user id is null
        if (userId == null) return new APIResponse<>(
                HttpStatus.BAD_REQUEST,
                "User ID cannot be null"
        );

        // Upvote the post
        service.upvote(userId, postId);
        return new APIResponse<>(
                HttpStatus.OK,
                "Post upvoted successfully"
        );
    }

    @PostMapping("downvote/{postId}/{userId}")
    public APIResponse<?> downVote(@PathVariable String postId, @PathVariable String userId){
        // Check if the user id is null
        if (userId == null) return new APIResponse<>(
                HttpStatus.BAD_REQUEST,
                "User ID cannot be null"
        );

        // Remove the upvote
        service.downvote(userId, postId);
        return new APIResponse<>(
                HttpStatus.OK,
                "Upvote removed successfully"
        );
    }

    @GetMapping("upvotes/{userId}")
    public APIResponse<?> getUserUpvoted(@PathVariable String userId){
        // Check if the user id is null
        if (userId == null) return new APIResponse<>(
                HttpStatus.BAD_REQUEST,
                "User ID cannot be null"
        );

        // Get the upvotes
        return new APIResponse<>(
                HttpStatus.OK,
                service.getUserUpvotedPosts(userId)
        );
    }

    @GetMapping("downvotes/{userId}")
    public APIResponse<?> getUserDownvoted(@PathVariable String userId){
        // Check if the user id is null
        if (userId == null) return new APIResponse<>(
                HttpStatus.BAD_REQUEST,
                "User ID cannot be null"
        );

        // Get the downvotes
        return new APIResponse<>(
                HttpStatus.OK,
                service.getUserDownvotedPosts(userId)
        );
    }

    @GetMapping("upvoted/{postId}/{userId}")
    public APIResponse<?> hasUpvoted(@PathVariable String postId, @PathVariable String userId){
        // Check if the post id is null
        if (postId == null) return new APIResponse<>(
                HttpStatus.BAD_REQUEST,
                "Post ID cannot be null"
        );

        // Check if user has upvoted
        return new APIResponse<>(
                HttpStatus.OK,
                service.hasUpvoted(userId, postId)
        );
    }

    // Check if user has downvoted
    @GetMapping("downvoted/{postId}/{userId}")
    public APIResponse<?> hasDownvoted(@PathVariable String postId, @PathVariable String userId){
        // Check if the post id is null
        if (postId == null) return new APIResponse<>(
                HttpStatus.BAD_REQUEST,
                "Post ID cannot be null"
        );

        // Check if user has downvoted
        return new APIResponse<>(
                HttpStatus.OK,
                service.hasDownvoted(userId, postId)
        );
    }
}
