package orbitaljin.codeus.store.services;

import orbitaljin.codeus.store.models.Comment;
import orbitaljin.codeus.store.repositories.CommentRepository;
import orbitaljin.codeus.store.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {
    @Autowired
    private CommentRepository repository;
    @Autowired
    private PostRepository postRepository;

    public List<Comment> getAllComments() {
        return repository.findAll();
    }

    public Comment getCommentById(String id) {
        return repository.findById(id).orElse(null);
    }

    public Comment createComment(Comment comment) {
        // Increment the comment count of the post
        postRepository.findById(comment.getPostId()).ifPresent(post -> {
            post.setCommentCount(post.getCommentCount() + 1);
            postRepository.save(post);
        });
        return repository.save(comment);
    }


    public void deleteComment(String id) {
        // Decrement the comment count of the post
        Comment comment = repository.findById(id).orElse(null);
        if (comment == null) return;
        postRepository.findById(comment.getPostId()).ifPresent(post -> {
            post.setCommentCount(post.getCommentCount() - 1);
            postRepository.save(post);
        });
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
