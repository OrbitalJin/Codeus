package orbitaljin.codeus.api.routers;

import orbitaljin.codeus.api.APIResponse;
import orbitaljin.codeus.store.DBHandler;
import orbitaljin.codeus.store.models.Bookmark;
import orbitaljin.codeus.store.repositories.BookmarkRepository;
import orbitaljin.codeus.store.repositories.PostRepository;
import orbitaljin.codeus.store.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.management.DescriptorKey;
import java.util.List;

@RestController
@RequestMapping("/bookmarks")
public class BookmarkRouter implements Router<Bookmark> {

    private final BookmarkRepository service;
    private final UserRepository userService;
    private final PostRepository postService;

    public BookmarkRouter() {
        this.service = DBHandler.getInstance().getBookmarkRepository();
        this.userService = DBHandler.getInstance().getUserRepository();
        this.postService = DBHandler.getInstance().getPostRepository();
    }

    @Override
    @GetMapping("/")
    // Dumps all bookmarks in the database
    public ResponseEntity<?> getAll() {
        return new APIResponse<List<Bookmark>>(
                HttpStatus.OK,
                this.service.findAll()
        ).toReponseEntity();
    }


    @Override
    @GetMapping("/{id}")
    // Get all bookmarks associated with a user
    public ResponseEntity<?> get(@PathVariable Long userId) {
        // if the id is null, return a 400 Bad Request response
        if (userId == null) return new APIResponse<List<Bookmark>>(
                HttpStatus.BAD_REQUEST,
                "ID cannot be null"
        ).toReponseEntity();

        // if the user does not exist, return a 404 Not Found response
        if (!this.userService.exists(userId)) return new APIResponse<List<Bookmark>>(
                HttpStatus.NOT_FOUND,
                "User not found"
        ).toReponseEntity();

        // Otherwise, return a 200 OK response with the bookmarks
        return new APIResponse<List<Bookmark>>(
                HttpStatus.OK,
                this.service.findByField("userId", userId)
        ).toReponseEntity();
    }

    @Override
    @PostMapping("/")
    public ResponseEntity<?> create(@RequestBody Bookmark entity) {
        // if the user does not exist, return a 404 Not Found response
        if (!this.userService.exists(entity.getUserId())) return new APIResponse<Bookmark>(
                HttpStatus.NOT_FOUND,
                "User not found"
        ).toReponseEntity();

        // if the post does not exist, return a 404 Not Found response
        if (!this.postService.exists(entity.getPostId())) return new APIResponse<Bookmark>(
                HttpStatus.NOT_FOUND,
                "Post not found"
        ).toReponseEntity();

        // prevent the user from bookmarking the same post multiple times
        List<Bookmark> bookmarks = this.service.findByFields(
                new String[]{"userId", "postId"},
                new Object[]{entity.getUserId(), entity.getPostId()}
        );
        if (!bookmarks.isEmpty()) return new APIResponse<Bookmark>(
                HttpStatus.BAD_REQUEST,
                "Bookmark already exists"
        ).toReponseEntity();

        // Otherwise, return a 200 OK response with the created bookmark
        return new APIResponse<Bookmark>(
                HttpStatus.OK,
                "Bookmark created successfully",
                this.service.create(entity)
        ).toReponseEntity();
    }


    @Override
    @DeleteMapping("/")
    public ResponseEntity<?> delete(@RequestBody Bookmark entity) {
        // if the bookmark does not exist, return a 404 Not Found response
        if (!this.service.exists(entity.getId())) return new APIResponse<Bookmark>(
                HttpStatus.NOT_FOUND,
                "Bookmark not found"
        ).toReponseEntity();

        // Otherwise, delete the bookmark and return a 200 OK response
        return new APIResponse<Bookmark>(
                HttpStatus.OK,
                "Bookmark deleted successfully",
                this.service.delete(entity.getId())
        ).toReponseEntity();
    }

    @Override
    // Not implemented, as it is not required
    public ResponseEntity<?> update(Bookmark entity) {
        return null;
    }

    @Override
    // Not implemented, as it is not required
    public ResponseEntity<?> search(String query) {
        return null;
    }
}
