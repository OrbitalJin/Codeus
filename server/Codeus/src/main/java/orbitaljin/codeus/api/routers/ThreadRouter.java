package orbitaljin.codeus.api.routers;

import jakarta.persistence.Entity;
import orbitaljin.codeus.api.APIResponse;
import orbitaljin.codeus.store.models.Thread;
import orbitaljin.codeus.store.services.ThreadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/threads")
public class ThreadRouter implements Router<Thread> {
    @Autowired
    private ThreadService service;

    @Override
    @GetMapping("/")
    public ResponseEntity<?> getAll() {
        // Return all threads and a 200 OK response
        return new APIResponse<List<Thread>>(
                HttpStatus.OK,
                this.service.getAllThreads()
        ).toReponseEntity();
    }

    @Override
    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable String id) {
        // Check if the id is null
        if (id == null) return new APIResponse<Thread>(
                HttpStatus.BAD_REQUEST,
                "ID cannot be null"
        ).toReponseEntity();

        // Return the thread with the given id
        return new APIResponse<Thread>(
                HttpStatus.OK,
                this.service.getThreadById(id)
        ).toReponseEntity();
    }

    @Override
    @PostMapping("/")
    public ResponseEntity<?> create(@RequestBody Thread entity) {
        // Check if the thread is null
        if (entity == null) return new APIResponse<Thread>(
                HttpStatus.BAD_REQUEST,
                "Thread cannot be null"
        ).toReponseEntity();

        // Create the thread
        return new APIResponse<Thread>(
                HttpStatus.CREATED,
                this.service.createThread(entity)
        ).toReponseEntity();
    }

    @Override
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@RequestBody Thread entity) {
        // Check if the thread is null
        if (entity == null) return new APIResponse<Thread>(
                HttpStatus.BAD_REQUEST,
                "Thread cannot be null"
        ).toReponseEntity();

        // Delete the thread
        this.service.deleteThread(entity.getId());
        return new APIResponse<Thread>(
                HttpStatus.OK,
                "Thread deleted"
        ).toReponseEntity();
    }

    @Override
    @PatchMapping("/")
    public ResponseEntity<?> update(Thread entity) {
        // Check if the thread is null
        if (entity == null) return new APIResponse<Thread>(
                HttpStatus.BAD_REQUEST,
                "Thread cannot be null"
        ).toReponseEntity();

        // Check if the thread does not exist
        if (this.service.getThreadById(entity.getId()) == null) return new APIResponse<Thread>(
                HttpStatus.NOT_FOUND,
                "Thread not found"
        ).toReponseEntity();

        // Update the thread
        this.service.updateThread(entity);
        return new APIResponse<Thread>(
                HttpStatus.OK,
                "Thread updated"
        ).toReponseEntity();
    }

    @Override
    @GetMapping("/search")
    public ResponseEntity<?> search(String query) {
        // Check if the query is null
        if (query == null) return new APIResponse<List<Thread>>(
                HttpStatus.BAD_REQUEST,
                "Query cannot be null"
        ).toReponseEntity();

        // Search for threads with the given title
        return new APIResponse<List<Thread>>(
                HttpStatus.OK,
                this.service.search(query)
        ).toReponseEntity();
    }
}
