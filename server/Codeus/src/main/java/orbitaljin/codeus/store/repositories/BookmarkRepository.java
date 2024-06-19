package orbitaljin.codeus.store.repositories;

import orbitaljin.codeus.store.models.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookmarkRepository extends JpaRepository<Bookmark, String> {
    Bookmark findByUserIdAndPostId(String userId, String postId);
    List<Bookmark> findByUserId(String userId);
    void deleteByUserIdAndPostId(String userId, String postId);
    void deleteAllByUserId(String userId);
}
