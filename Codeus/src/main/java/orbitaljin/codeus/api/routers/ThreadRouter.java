package orbitaljin.codeus.api.routers;

import orbitaljin.codeus.store.DBHandler;
import orbitaljin.codeus.store.models.Thread;
import orbitaljin.codeus.store.repositories.ThreadRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/threads")
public class ThreadRouter {
    private final ThreadRepository service;

    public ThreadRouter() {
        this.service = DBHandler.getInstance().threadRepository;
    }

    @GetMapping("/")
    public List<Thread> getAll() {
        return this.service.findAll();
    }

    @GetMapping("/{id}")
    public Thread getThread(@PathVariable Long id) {
        return this.service.findById(id);
    }

    @PostMapping("/")
    public Thread createThread(
        @RequestParam String title,
        @RequestParam String description
    ) {
        if (title == null || description == null) return null;
        return this.service.create(new Thread(
                title,
                description
        ));
    }
    @GetMapping("/search")
    public List<Thread> fuzzySearch(String fuzzy) {
        return this.service.fuzzySearch(fuzzy);
    }
}
