package orbitaljin.codeus.api.routers;

import orbitaljin.codeus.api.APIResponse;
import orbitaljin.codeus.store.models.Comment;
import orbitaljin.codeus.store.models.User;
import orbitaljin.codeus.store.services.CommentService;
import orbitaljin.codeus.store.services.UserService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentRouter {
    @Autowired
    private CommentService commentService;
    @Autowired
    private UserService userService;

    @GetMapping("/")
    public ResponseEntity<?> getAllComments() {
        return new APIResponse<List<Comment>>(
                HttpStatus.OK,
                "All comments",
                commentService.getAllComments()
        ).toReponseEntity();
    }

    @PostMapping("/")
    public ResponseEntity<?> createComment(@RequestBody Comment comment) {
        System.out.println(comment);
        // check if comment is valid
        if (comment == null) {
            return new APIResponse<Comment>(
                    HttpStatus.BAD_REQUEST,
                    "Invalid comment",
                    null
            ).toReponseEntity();
        }
        // create comment
        return new APIResponse<Comment>(
                HttpStatus.CREATED,
                "Comment created",
                commentService.createComment(comment)
        ).toReponseEntity();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable String id) {
        // check if comment exists
        if (commentService.getCommentById(id) == null) {
            return new APIResponse<Comment>(
                    HttpStatus.NOT_FOUND,
                    "Comment not found",
                    null
            ).toReponseEntity();
        }
        // delete comment
        commentService.deleteComment(id);
        return new APIResponse<Comment>(
                HttpStatus.OK,
                "Comment deleted",
                null
        ).toReponseEntity();
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<?> getCommentsByPostId(@PathVariable String postId) {
        // Check if post exists
        if (commentService.searchByPostId(postId).isEmpty()) {
            return new APIResponse<List<Comment>>(
                    HttpStatus.OK,
                    "No comments found for post " + postId,
                    null
            ).toReponseEntity();
        }

        // Get comments by post id
        return new APIResponse<List<Comment>>(
                HttpStatus.OK,
                "Comments for post " + postId,
                commentService.searchByPostId(postId)
        ).toReponseEntity();
    }

    @GetMapping("/user/{authorId}")
    public ResponseEntity<?> getCommentsByAuthorId(@PathVariable String authorId) {
        // Check if author exists
        if (userService.getUserById(authorId) == null) {
            return new APIResponse<List<Comment>>(
                    HttpStatus.NOT_FOUND,
                    "No comments found for author " + authorId,
                    null
            ).toReponseEntity();
        }

        // Get comments by author id
        return new APIResponse<List<Comment>>(
                HttpStatus.OK,
                "Comments by author " + authorId,
                commentService.searchByAuthorId(authorId)
        ).toReponseEntity();
    }
}
