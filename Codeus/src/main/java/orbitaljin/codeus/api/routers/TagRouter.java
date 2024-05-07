package orbitaljin.codeus.api.routers;

import orbitaljin.codeus.store.DBHandler;
import orbitaljin.codeus.store.models.Tag;
import orbitaljin.codeus.store.repositories.Repository;
import orbitaljin.codeus.store.repositories.TagRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tags")
public class TagRouter {
    private final TagRepository service;

    public TagRouter() {
        this.service = DBHandler.getInstance().tagRepository;
    }

    // Get All tags
    @GetMapping("/")
    public List<Tag> getAll() {
        return this.service.findAll();
    }

    // Get tag by id
    @GetMapping("/{id}")
    public Tag getTag(@PathVariable Long id) {
        if (id == null) return null;
        return this.service.findById(id);
    }

    // Create new tag
    @PostMapping("/")
    public Tag createTag(@RequestParam String name, @RequestParam String color) {
        if (name == null || color == null) return null;
        return this.service.create(new Tag(
                name,
                color
        ));
    }

    // TODO: Fuzzy find tags by name
    @GetMapping("/search")
    public List<Tag> fuzzySearch(@RequestParam String query) {
        return this.service.fuzzySearch(query);
    }
}
