package orbitaljin.codeus.api.routers;

import orbitaljin.codeus.api.APIResponse;
import orbitaljin.codeus.store.models.Post;
import orbitaljin.codeus.store.services.PostService;
import orbitaljin.codeus.store.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostRouter implements Router<Post> {
    @Autowired
    private PostService service;

    @Autowired
    private UserService userService;

    @Override
    @GetMapping("/")
    public ResponseEntity<?> getAll() {
        // Return all posts
        return new APIResponse<List<Post>>(
                HttpStatus.OK,
                this.service.getAllPosts()
        ).toReponseEntity();
    }

    @Override
    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable  String id) {
        // Check if the id is null
        if (id == null) return new APIResponse<Post>(
                HttpStatus.BAD_REQUEST,
                "ID cannot be null"
        ).toReponseEntity();

        // Check if the post does not exist
        if (this.service.getPostById(id) == null) return new APIResponse<Post>(
                HttpStatus.NOT_FOUND,
                "Post not found"
        ).toReponseEntity();

        // Otherwise, return a 200 OK response with the post
        return new APIResponse<Post>(
                HttpStatus.OK,
                this.service.getPostById(id)
        ).toReponseEntity();
    }

    @GetMapping("/author/{authorId}")
    public ResponseEntity<?> getByAuthor(@PathVariable String authorId) {
        // Check if the author is null
        if (authorId == null) return new APIResponse<Post>(
                HttpStatus.BAD_REQUEST,
                "Author cannot be null"
        ).toReponseEntity();

        // Return all posts by the author
        return new APIResponse<List<Post>>(
                HttpStatus.OK,
                this.service.searchByAuthorId(authorId)
        ).toReponseEntity();
    }

    @Override
    @PostMapping("/")
    public ResponseEntity<?> create(@RequestBody Post entity) {
        // Check if the title or content is null
        if (entity.getTitle() == null || entity.getContent() == null) {
            return new APIResponse<Post>(
                    HttpStatus.BAD_REQUEST,
                    "Title and content cannot be null"
            ).toReponseEntity();
        }

        // Create the post
        return new APIResponse<Post>(
                HttpStatus.CREATED,
                this.service.createPost(entity)
        ).toReponseEntity();
    }

    @Override
    @DeleteMapping("/")
    public ResponseEntity<?> delete(@RequestBody Post entity) {
        // Check if the post does not exist
        if (this.service.getPostById(entity.getId()) == null) return new APIResponse<Post>(
                HttpStatus.NOT_FOUND,
                "Post not found"
        ).toReponseEntity();

        // Delete the post
        this.service.deletePost(entity.getId());
        return new APIResponse<Post>(
                HttpStatus.OK,
                "Post deleted successfully"
        ).toReponseEntity();
    }

    @Override
    @PatchMapping("/")
    public ResponseEntity<?> update(@RequestBody Post entity) {
        // Check if the id, title or content is null
        if (entity.getId() == null || entity.getTitle() == null || entity.getContent() == null) {
            return new APIResponse<Post>(
                    HttpStatus.BAD_REQUEST,
                    "ID, title and content cannot be null"
            ).toReponseEntity();
        }

        // Check if the post does not exist
        if (this.service.getPostById(entity.getId()) == null) return new APIResponse<Post>(
                HttpStatus.NOT_FOUND,
                "Post not found"
        ).toReponseEntity();

        // Update the post
        return new APIResponse<Post>(
                HttpStatus.OK,
                this.service.updatePost(entity)
        ).toReponseEntity();
    }

    @Override
    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestBody String query) {
        // Search for posts by title
        return new APIResponse<List<Post>>(
                HttpStatus.OK,
                this.service.searchByTitle(query)
        ).toReponseEntity();
    }
}
