package orbitaljin.codeus.store.repositories;

import orbitaljin.codeus.store.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, String>{
//    Post findByAuthor(String author);
    List<Post> findByTitleContaining(String title);
}
