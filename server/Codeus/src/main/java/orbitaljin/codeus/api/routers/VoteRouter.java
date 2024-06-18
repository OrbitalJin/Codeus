package orbitaljin.codeus.api.routers;

import orbitaljin.codeus.api.APIResponse;
import orbitaljin.codeus.store.services.VoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/upvotes")
public class VoteRouter {
    @Autowired
    private VoteService service;

    @GetMapping("/{postId}/{userId}")
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

    @PostMapping("/{postId}/{userId}")
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

        // Check if user has already upvoted
        if (service.hasUpvoted(userId, postId)) {
            // Delete the upvote
            service.removeUpvote(userId, postId);
            return new APIResponse<>(
                    HttpStatus.OK,
                    "Upvote removed successfully"
            );
        }

        // Upvote the post
        service.upvote(userId, postId);
        return new APIResponse<>(
                HttpStatus.OK,
                "Post upvoted successfully"
        );
    }

    @DeleteMapping("/{postId}/{userId}")
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
}
