package orbitaljin.codeus.api.routers;

import orbitaljin.codeus.api.APIResponse;
import orbitaljin.codeus.store.DBHandler;
import orbitaljin.codeus.store.models.Post;
import orbitaljin.codeus.store.repositories.PostRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostRouter implements Router<Post> {
    private final PostRepository service;

    public PostRouter() {
        this.service = DBHandler.getInstance().getPostRepository();
    }

    @Override
    @GetMapping("/")
    public ResponseEntity<?> getAll() {
        // Return a 200 OK response with all the Posts
        return new APIResponse<List<Post>>(
                HttpStatus.OK,
                this.service.findAll()
        ).toReponseEntity();
    }

    @Override
    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Long id) {
        // if the id is null, return a 400 Bad Request response
        if (id == null) return new APIResponse<Post>(
                HttpStatus.BAD_REQUEST,
                "ID cannot be null"
        ).toReponseEntity();

        // If the Post does not exist, return a 404 Not Found response
        if (this.service.findById(id) == null) return new APIResponse<Post>(
                HttpStatus.NOT_FOUND,
                "post not found"
        ).toReponseEntity();

        // Otherwise, return a 200 OK response with the Post
        return new APIResponse<Post>(
                HttpStatus.OK,
                this.service.findById(id)
        ).toReponseEntity();
    }

    @Override
    @PostMapping("/")
    // TODO: Check if user exists
    public ResponseEntity<?> create(@RequestBody Post post) {
        // if the content is empty, return a 400 Bad Request response
        if (post.getContent().isEmpty() || post.getTitle().isEmpty()) return new APIResponse<Post>(
                HttpStatus.BAD_REQUEST,
                "post cannot be empty"
        ).toReponseEntity();

        // if the user id is null, return a 400 Bad Request response
        if (post.getUserId() == null) return new APIResponse<Post>(
                HttpStatus.BAD_REQUEST,
                "User ID cannot be null"
        ).toReponseEntity();

        // Otherwise, create the Post and return a 201 Created response
        return new APIResponse<Post>(
                HttpStatus.CREATED,
                "Post created successfully",
                this.service.create(post)
        ).toReponseEntity();
    }

    @Override
    @DeleteMapping("/")
    public ResponseEntity<?> delete(@RequestBody Post post) {
        // if the Post does not exist, return a 404 Not Found response
        if (this.service.findById(post.getId()) == null) return new APIResponse<Post>(
                HttpStatus.NOT_FOUND,
                "post not found"
        ).toReponseEntity();

        // Otherwise, delete the Post and return a 200 OK response
        this.service.delete(post.getId());
        return new APIResponse<Post>(
                HttpStatus.OK,
                "post deleted successfully"
        ).toReponseEntity();
    }

    @Override
    @PatchMapping("/")
    public ResponseEntity<?> update(@RequestBody Post post) {
        // if the id or content is null, return a 400 Bad Request response
        if (post.getId() == null) return new APIResponse<Post>(
                HttpStatus.BAD_REQUEST,
                "ID cannot be null"
        ).toReponseEntity();

        // if the Post does not exist, return a 404 Not Found response
        if (this.service.findById(post.getId()) == null) return new APIResponse<Post>(
                HttpStatus.NOT_FOUND,
                "post not found"
        ).toReponseEntity();

        // otherwise, update the Post and return a 200 OK response
        return new APIResponse<Post>(
                HttpStatus.OK,
                "post updated successfully",
                this.service.update(post)
        ).toReponseEntity();
    }

    @Override
    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam String query) {
        // if the query is empty, return a 400 Bad Request response
        if (query.isEmpty()) return new APIResponse<Post>(
                HttpStatus.BAD_REQUEST,
                "Query cannot be empty"
        ).toReponseEntity();

        // Return a 200 OK response with the search results
        return new APIResponse<List<Post>>(
                HttpStatus.OK,
                this.service.search("title", query)
        ).toReponseEntity();
    }

}
