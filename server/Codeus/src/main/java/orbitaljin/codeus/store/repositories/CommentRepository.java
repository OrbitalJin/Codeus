package orbitaljin.codeus.store.repositories;

import orbitaljin.codeus.store.models.Comment;
import orbitaljin.codeus.store.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, String>{
    List<Comment> findByPostId(String postId);
    List<Comment> findByAuthorId(String authorId);
    List<Comment> findByContentContaining(String content);
}
