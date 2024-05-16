package orbitaljin.codeus.api.routers;

import orbitaljin.codeus.api.APIResponse;
import orbitaljin.codeus.store.DBHandler;
import orbitaljin.codeus.store.models.Tag;
import orbitaljin.codeus.store.repositories.TagRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tags")
public class TagRouter implements Router<Tag> {
    private final TagRepository service;

    public TagRouter() {
        this.service = DBHandler.getInstance().getTagRepository();
    }

    @Override
    @GetMapping("/")
    public ResponseEntity<?> getAll() {
        // Return a 200 OK response with all Tags
        return new APIResponse<List<Tag>>(
                HttpStatus.OK,
                this.service.findAll()
        ).toReponseEntity();
    }

    @Override
    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Long id) {
        // if the id is null, return a 400 Bad Request response
        if (id == null) return new APIResponse<Tag>(
                HttpStatus.BAD_REQUEST,
                "ID cannot be null"
        ).toReponseEntity();

        // Early query prevents us from hitting the db twice (worst case)
        Tag tag = this.service.findById(id);

        // if the Tag does not exist, return a 404 Not Found response
        if (tag == null) return new APIResponse<Tag>(
                HttpStatus.NOT_FOUND,
                "tag not found"
        ).toReponseEntity();

        // Otherwise, return the appropriate tag
        return new APIResponse<Tag>(
                HttpStatus.OK,
                tag
        ).toReponseEntity();
    }

    @Override
    @PostMapping("/")
    public ResponseEntity<?> create(@RequestBody Tag tag) {
        // if the name or color is empty, return a 400 Bad Request response
        if (tag.getName().isEmpty() || tag.getColor().isEmpty()) return new APIResponse<Tag>(
                HttpStatus.BAD_REQUEST,
                "name or color cannot be null"
        ).toReponseEntity();

        // if the name is already in use, return a Conflict response
        if (
                !this.service.findByField("name", tag.getName()).isEmpty()
        ) return new APIResponse<Tag>(
                HttpStatus.CONFLICT,
                "name already in use"
        ).toReponseEntity();

        // Otherwise, create the Tag and return a 201 Created response
        return new APIResponse<Tag>(
                HttpStatus.CREATED,
                "Tag created successfully"
        ).toReponseEntity();
    }

    @Override
    @DeleteMapping("/")
    public ResponseEntity<?> delete(@RequestBody Tag tag) {
        // if the id is null, return a 400 Bad Request response
        if (tag.getId() == null) return new APIResponse<Tag>(
                HttpStatus.BAD_REQUEST,
                "ID cannot be null"
        ).toReponseEntity();

        // if the Tag does not exist, return a 404 Not Found response
        if (!this.service.exists(tag)) return new APIResponse<Tag>(
                HttpStatus.NOT_FOUND,
                "Tag not found"
        ).toReponseEntity();

        // Otherwise, delete the Tag and return a 200 OK response
        this.service.delete(tag);
        return new APIResponse<Tag>(
                HttpStatus.OK,
                "Tag deleted successfully"
        ).toReponseEntity();
    }

    @Override
    @PatchMapping("/")
    public ResponseEntity<?> update(@RequestBody Tag tag) {
        // if the id, name or color is null, return a 400 Bad Request response
        if (tag.getId() == null || tag.getName().isEmpty() || tag.getColor().isEmpty()) return new APIResponse<Tag>(
                HttpStatus.BAD_REQUEST,
                "ID, name and color cannot be null"
        ).toReponseEntity();

        // if the Tag does not exist, return a 404 Not Found response
        if (!this.service.exists(tag)) return new APIResponse<Tag>(
                HttpStatus.NOT_FOUND,
                "Tag not found"
        ).toReponseEntity();

        // Otherwise, update the Tag and return a 200 OK response
        this.service.update(tag);
        return new APIResponse<Tag>(
                HttpStatus.OK,
                "Tag updated successfully"
        ).toReponseEntity();
    }

    @Override
    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam String query) {
        // if the name is null, return a 400 Bad Request response
        if (query == null) return new APIResponse<Tag>(
                HttpStatus.BAD_REQUEST,
                "Name cannot be null"
        ).toReponseEntity();

        // Otherwise, return the appropriate tag
        return new APIResponse<List<Tag>>(
                HttpStatus.OK,
                this.service.findByField("name", query)
        ).toReponseEntity();
    }
}
