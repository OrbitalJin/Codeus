package orbitaljin.codeus.api.routers;

import orbitaljin.codeus.store.DBHandler;
import orbitaljin.codeus.store.models.Post;
import orbitaljin.codeus.store.repositories.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostRouter {
    private final Repository<Post> service;
    public PostRouter() {
        this.service = DBHandler.getInstance().postRepository;
    }
    @GetMapping("/")
    public List<Post> getPosts() {
        return this.service.findAll();
    }

    @PostMapping("/")
    public Post createPost(
            @RequestParam Long userId,
            @RequestParam String title,
            @RequestParam String content
    ) {
        if (userId == null || title == null || content == null) return null;
        return this.service.create(new Post(
                userId,
                title,
                content,
                Post.PostType.SNIPPET
        ));
    }

    @GetMapping("/{id}")
    public Post getPost(@PathVariable Long id) {
        if (id == null) return null;
        return this.service.findById(id);
    }
}
