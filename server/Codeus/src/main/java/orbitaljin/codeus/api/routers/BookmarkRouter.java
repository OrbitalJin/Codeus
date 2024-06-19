package orbitaljin.codeus.api.routers;

import orbitaljin.codeus.api.APIResponse;
import orbitaljin.codeus.store.services.BookmarkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bookmarks")
public class BookmarkRouter {
    @Autowired
    private BookmarkService service;

    @PostMapping("/{postId}/{userId}")
    public ResponseEntity<?> createBookmark(@PathVariable String userId, @PathVariable String postId) {
        service.createBookmark(userId, postId);
        return new APIResponse<>(
                HttpStatus.OK,
                "Bookmark created"
        ).toReponseEntity();
    }

    @DeleteMapping("/{postId}/{userId}")
    public ResponseEntity<?> deleteBookmark(@PathVariable String userId, @PathVariable String postId) {
        service.deleteBookmark(userId, postId);
        return new APIResponse<>(
                HttpStatus.OK,
                "Bookmark deleted"
        ).toReponseEntity();
    }

    @PostMapping("/toggle/{postId}/{userId}")
    public ResponseEntity<?> toggleBookmark(@PathVariable String userId, @PathVariable  String postId) {
        service.toggleBookmark(userId, postId);
        return new APIResponse<>(
                HttpStatus.OK,
                "Bookmark toggled"
        ).toReponseEntity();
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getAllBookmarks(@PathVariable String userId) {
        return new APIResponse<>(
                HttpStatus.OK,
                service.getAllBookmarks(userId)
        ).toReponseEntity();
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deleteAllBookmarks(@PathVariable String userId) {
        service.deleteAllBookmarks(userId);
        return new APIResponse<>(
                HttpStatus.OK,
                "All bookmarks deleted"
        ).toReponseEntity();
    }

    @GetMapping("/isBookmarked/{postId}/{userId}")
    public ResponseEntity<?> isBookmarked(@PathVariable String userId, @PathVariable String postId) {
        return new APIResponse<>(
                HttpStatus.OK,
                service.isBookmarked(userId, postId)
        ).toReponseEntity();
    }
}
