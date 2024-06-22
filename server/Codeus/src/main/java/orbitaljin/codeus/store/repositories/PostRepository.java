package orbitaljin.codeus.store.repositories;

import orbitaljin.codeus.store.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, String>{
    List<Post> findByTitleContaining(String title);
    List<Post> findByAuthorId(String authorId);
}
