package orbitaljin.codeus.store.services;

import jakarta.transaction.Transactional;
import orbitaljin.codeus.store.models.Bookmark;
import orbitaljin.codeus.store.models.Post;
import orbitaljin.codeus.store.repositories.BookmarkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookmarkService {
    @Autowired
    private BookmarkRepository repository;
    @Autowired
    private PostService postService;

    @Transactional
    public void createBookmark(String userId, String postId) {
        // Check if the bookmark already exists
        if (repository.findByUserIdAndPostId(userId, postId) != null) return;

        repository.save(new Bookmark(userId, postId));
    }

    @Transactional
    public void deleteBookmark(String userId, String postId) {
        repository.deleteByUserIdAndPostId(userId, postId);
    }

    @Transactional
    public List<Post> getAllBookmarks(String userId) {
        List<Bookmark> bookmarks = repository.findByUserId(userId);
        List<Post> posts = new ArrayList<>();
        for (Bookmark bookmark : bookmarks) {
            posts.add(postService.getPostById(bookmark.getPostId()));
        }
        return posts;
    }

    @Transactional
    public boolean isBookmarked(String userId, String postId) {
        return repository.findByUserIdAndPostId(userId, postId) != null;
    }

    @Transactional
    public void toggleBookmark(String userId, String postId) {
        if (isBookmarked(userId, postId)) {
            deleteBookmark(userId, postId);
        } else {
            createBookmark(userId, postId);
        }
    }

    @Transactional
    public void deleteAllBookmarks(String userId) {
        repository.deleteAllByUserId(userId);
    }
}
