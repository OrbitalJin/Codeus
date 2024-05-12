package orbitaljin.codeus.api.routers;

import orbitaljin.codeus.api.APIResponse;
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
public class ThreadRouter implements Router<Thread>{
    private final ThreadRepository service;

    public ThreadRouter() {
        this.service = DBHandler.getInstance().threadRepository;
    }

    @Override
    @GetMapping("/")
    public ResponseEntity<?> getAll() {
        // Return a 200 OK response with all the threads
        return new APIResponse<List<Thread>>(
                HttpStatus.OK,
                this.service.findAll()
        ).toReponseEntity();

    }

    @Override
    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Long id) {
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

    @Override
    @PostMapping("/")
    public ResponseEntity<?> create(@RequestBody Thread thread) {
        // If the title is empty, return a 400 Bad Request response
        if (Objects.equals(thread.getTitle(), "")) return new APIResponse<Thread>(
                HttpStatus.BAD_REQUEST,
                "Title cannot be empty"
        ).toReponseEntity();

        // Check if the name is already taken
        if (this.service.exists(thread)) return new APIResponse<Thread>(
                HttpStatus.BAD_REQUEST,
                "Title already taken"
        ).toReponseEntity();

        // Oterhwise, create the thread and return a 201 Created response
        return new APIResponse<Thread>(
                HttpStatus.CREATED,
                "Thread created successfully",
                this.service.create(thread)
        ).toReponseEntity();
    }

    @Override
    @PatchMapping("/")
    public ResponseEntity<?> update(@RequestBody Thread thread) {
        // if the id or title is null, return a 400 Bad Request response
        if (thread.getId() == null || Objects.equals(thread.getTitle(), "")) return new APIResponse<Thread>(
                HttpStatus.BAD_REQUEST,
                "ID and title cannot be null"
        ).toReponseEntity();

        // if the thread does not exist, return a 404 Not Found response
        if (this.service.exists(thread)) return new APIResponse<Thread>(
                HttpStatus.NOT_FOUND,
                "Thread not found"
        ).toReponseEntity();

        // otherwise, update the thread and return a 200 OK response
        return new APIResponse<Thread>(
                HttpStatus.OK,
                "Thread updated successfully",
                this.service.update(thread)
        ).toReponseEntity();
    }

    @Override
    @DeleteMapping("/")
    public ResponseEntity<?> delete(@RequestBody Thread thread) {
        // if the id is null, return a 400 Bad Request response
        if (thread.getId() == null) return new APIResponse<Thread>(
                HttpStatus.BAD_REQUEST,
                "ID cannot be null"
        ).toReponseEntity();

        // if the thread does not exist, return a 404 Not Found response
        if (!this.service.exists(thread)) return new APIResponse<Thread>(
                HttpStatus.NOT_FOUND,
                "Thread not found"
        ).toReponseEntity();

        // otherwise, delete the thread and return a 200 OK response
        return new APIResponse<Thread>(
                HttpStatus.OK,
                "Thread deleted successfully",
                this.service.delete(thread.getId())
        ).toReponseEntity();
    }

    @Override
    @GetMapping("/search")
    public ResponseEntity<?> search(String query) {
        // If the query is empty, return a 400 Bad Request response
        if (Objects.equals(query, "")) return new APIResponse<List<Thread>>(
                HttpStatus.BAD_REQUEST,
                "Query cannot be empty"
        ).toReponseEntity();

        // Otherwise, return a 200 OK response with the search results
        return new APIResponse<List<Thread>>(
                HttpStatus.OK,
                this.service.search("title", query)
        ).toReponseEntity();
    }
}
