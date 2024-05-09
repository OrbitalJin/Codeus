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
        // Return a 200 OK response with all the threads
        return new APIResponse<List<Thread>>(
                HttpStatus.OK,
                this.service.findAll()
        ).toReponseEntity();

    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getThread(@PathVariable Long id) {
        // if the id is null, return a 400 Bad Request response
        if (id == null) return new APIResponse<Thread>(
                HttpStatus.BAD_REQUEST,
                "ID cannot be null"
        ).toReponseEntity();

        // If the thread does not exist, return a 404 Not Found response
        if (this.service.findById(id) == null) return new APIResponse<Thread>(
                HttpStatus.NOT_FOUND,
                "Thread not found"
        ).toReponseEntity();

        // Otherwise, return a 200 OK response with the thread
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
        // If the title is empty, return a 400 Bad Request response
        if (Objects.equals(title, "")) return new APIResponse<Thread>(
                HttpStatus.BAD_REQUEST,
                "Title cannot be empty"
        ).toReponseEntity();

        // Check if the name is already taken
        if (this.service.exists(title)) return new APIResponse<Thread>(
                HttpStatus.BAD_REQUEST,
                "Title already taken"
        ).toReponseEntity();

        // Oterhwise, create the thread and return a 201 Created response
        return new APIResponse<Thread>(
                HttpStatus.CREATED,
                this.service.create(new Thread(
                        title,
                        description
                ))
        ).toReponseEntity();
    }
    @GetMapping("/search")
    public ResponseEntity<?> fuzzySearch(String fuzzy) {
        // If the query is empty, return a 400 Bad Request response
        if (Objects.equals(fuzzy, "")) return new APIResponse<List<Thread>>(
                HttpStatus.BAD_REQUEST,
                "Query cannot be empty"
        ).toReponseEntity();

        // Otherwise, return a 200 OK response with the search results
        return new APIResponse<List<Thread>>(
                HttpStatus.OK,
                this.service.fuzzySearch(fuzzy)
        ).toReponseEntity();
    }
}
