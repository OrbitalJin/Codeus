package orbitaljin.codeus.api.routers;

import orbitaljin.codeus.api.errors.APIResponse;
import orbitaljin.codeus.store.DBHandler;
import orbitaljin.codeus.store.models.Thread;
import orbitaljin.codeus.store.repositories.ThreadRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/threads")
public class ThreadRouter {
    private final ThreadRepository service;

    public ThreadRouter() {
        this.service = DBHandler.getInstance().threadRepository;
    }

    @GetMapping("/")
    public ResponseEntity<?> getAll() {
        return new APIResponse<List<Thread>>(
                HttpStatus.OK,
                this.service.findAll()
        ).toReponseEntity();

    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getThread(@PathVariable Long id) {
        return new APIResponse<Thread>(
                HttpStatus.OK,
                this.service.findById(id)
        ).toReponseEntity();
    }

    @PostMapping("/")
    public ResponseEntity<?> createThread(
        @RequestParam String title,
        @RequestParam String description
    ) {
        Thread thread = null;
        if (!Objects.equals(title, "")) {
            thread = this.service.create(new Thread(
                    title,
                    description
            ));
        }
        return new APIResponse<Thread>(
                HttpStatus.CREATED,
                thread
        ).toReponseEntity();
    }
    @GetMapping("/search")
    public ResponseEntity<?> fuzzySearch(String fuzzy) {
        return new APIResponse<List<Thread>>(
                HttpStatus.OK,
                this.service.fuzzySearch(fuzzy)
        ).toReponseEntity();
    }
}
