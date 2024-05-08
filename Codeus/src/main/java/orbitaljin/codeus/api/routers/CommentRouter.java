package orbitaljin.codeus.api.routers;

import orbitaljin.codeus.store.DBHandler;
import orbitaljin.codeus.store.models.Comment;
import orbitaljin.codeus.store.repositories.CommentRepository;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.CoderMalfunctionError;
import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentRouter {
    private final CommentRepository service;

    public CommentRouter() {
        this.service = DBHandler.getInstance().commentRepository;
    }

    @GetMapping("/")
    public List<Comment> getAll() {
        return this.service.findAll();
    }

    @GetMapping("/{id}")
    public Comment getComment(@PathVariable Long id) {
        return this.service.findById(id);
    }

    @PostMapping("/")
    public Comment createComment(
            @RequestParam Long userId,
            @RequestParam Long postId,
            @RequestParam String content
            ) {
        if (postId == null || userId == null || content == null) return null;
        return this.service.create(new Comment(
                userId,
                postId,
                content
        ));
    }

    @GetMapping("/search")
    public List<Comment> fuzzySearch(@RequestParam String query) {
        return this.service.fuzzySearch(query);
    }
}
