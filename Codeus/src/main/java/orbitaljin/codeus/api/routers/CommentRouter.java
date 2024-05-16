package orbitaljin.codeus.api.routers;

import orbitaljin.codeus.api.APIResponse;
import orbitaljin.codeus.store.DBHandler;
import orbitaljin.codeus.store.models.Comment;
import orbitaljin.codeus.store.repositories.CommentRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentRouter implements Router<Comment> {
    private final CommentRepository service;

    public CommentRouter() {
        this.service = DBHandler.getInstance().getCommentRepository();
    }

    @Override
    @GetMapping("/")
    public ResponseEntity<?> getAll() {
        // Return a 200 OK response with all the comments
        return new APIResponse<List<Comment>>(
            HttpStatus.OK,
            this.service.findAll()
        ).toReponseEntity();
    }

    @Override
    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Long id) {
        // if the id is null, return a 400 Bad Request response
        if (id == null) return new APIResponse<Comment>(
            HttpStatus.BAD_REQUEST,
            "ID cannot be null"
        ).toReponseEntity();

        // If the comment does not exist, return a 404 Not Found response
        if (!this.service.exists(id)) return new APIResponse<Comment>(
            HttpStatus.NOT_FOUND,
            "Comment not found"
        ).toReponseEntity();

        // Otherwise, return a 200 OK response with the comment
        return new APIResponse<Comment>(
            HttpStatus.OK,
            this.service.findById(id)
        ).toReponseEntity();
    }

    @Override
    @PostMapping("/")
    // TODO: Check if user exists
    public ResponseEntity<?> create(@RequestBody Comment comment) {
        // if the content is empty, return a 400 Bad Request response
        if (comment.getContent().isEmpty()) return new APIResponse<Comment>(
            HttpStatus.BAD_REQUEST,
            "Content cannot be empty"
        ).toReponseEntity();

        // if the post id is null, return a 400 Bad Request response
        if (comment.getPostId() == null) return new APIResponse<Comment>(
            HttpStatus.BAD_REQUEST,
            "Post ID cannot be null"
        ).toReponseEntity();

        // if the user id is null, return a 400 Bad Request response
        if (comment.getUserId() == null) return new APIResponse<Comment>(
            HttpStatus.BAD_REQUEST,
            "User ID cannot be null"
        ).toReponseEntity();

        // Otherwise, create the comment and return a 201 Created response
        return new APIResponse<Comment>(
            HttpStatus.CREATED,
            "Comment created successfully",
            this.service.create(comment)
        ).toReponseEntity();
    }

    @Override
    @DeleteMapping("/")
    public ResponseEntity<?> delete(@RequestBody Comment comment) {
        // if the comment does not exist, return a 404 Not Found response
        if (!this.service.exists(comment)) return new APIResponse<Comment>(
            HttpStatus.NOT_FOUND,
            "Comment not found"
        ).toReponseEntity();

        // Otherwise, delete the comment and return a 200 OK response
        return new APIResponse<Comment>(
            HttpStatus.OK,
            "Comment deleted successfully",
            this.service.delete(comment)
        ).toReponseEntity();
    }

    @Override
    @PatchMapping("/")
    public ResponseEntity<?> update(@RequestBody Comment comment) {
        // if the id or content is null, return a 400 Bad Request response
        if (comment.getId() == null || comment.getContent().isEmpty()) return new APIResponse<Comment>(
            HttpStatus.BAD_REQUEST,
            "ID and content cannot be null"
        ).toReponseEntity();

        // if the comment does not exist, return a 404 Not Found response
        if (!this.service.exists(comment)) return new APIResponse<Comment>(
            HttpStatus.NOT_FOUND,
            "Comment not found"
        ).toReponseEntity();

        // otherwise, update the comment and return a 200 OK response
        return new APIResponse<Comment>(
            HttpStatus.OK,
            "Comment updated successfully",
            this.service.update(comment)
        ).toReponseEntity();
    }

    @Override
    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam String query) {
        // if the query is empty, return a 400 Bad Request response
        if (query.isEmpty()) return new APIResponse<Comment>(
            HttpStatus.BAD_REQUEST,
            "Query cannot be empty"
        ).toReponseEntity();

        // Return a 200 OK response with the search results
        return new APIResponse<List<Comment>>(
            HttpStatus.OK,
            this.service.search("content", query)
        ).toReponseEntity();
    }

}
