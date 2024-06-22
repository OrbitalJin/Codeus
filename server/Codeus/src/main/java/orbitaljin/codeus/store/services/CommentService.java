package orbitaljin.codeus.store.services;

import orbitaljin.codeus.store.models.Comment;
import orbitaljin.codeus.store.repositories.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {
    @Autowired
    private CommentRepository repository;

    public List<Comment> getAllComments() {
        return repository.findAll();
    }

    public Comment getCommentById(String id) {
        return repository.findById(id).orElse(null);

    }

    public Comment createComment(Comment comment) {
        return repository.save(comment);
    }

    public Comment updateComment(Comment comment) {
        return repository.save(comment);
    }

    public void deleteComment(String id) {
        repository.deleteById(id);
    }

    public List<Comment> searchByPostId(String postId) {
        return repository.findByPostId(postId);
    }

    public List<Comment> searchByAuthorId(String authorId) {
        return repository.findByAuthorId(authorId);
    }

    public List<Comment> searchByContent(String content) {
        return repository.findByContentContaining(content);
    }
}
