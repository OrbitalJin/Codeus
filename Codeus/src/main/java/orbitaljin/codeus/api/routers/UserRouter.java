package orbitaljin.codeus.api.routers;

import orbitaljin.codeus.api.APIResponse;
import orbitaljin.codeus.store.DBHandler;
import orbitaljin.codeus.store.models.User;
import orbitaljin.codeus.store.repositories.Repository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/users")
public class UserRouter implements Router<User> {
    private final Repository<User> service;
    public UserRouter() {
        this.service = DBHandler.getInstance().getUserRepository();
    }
    @Override
    @GetMapping("/")
    public ResponseEntity<?> getAll() {
        // Return all users
        return new APIResponse<List<User>>(
                HttpStatus.OK,
                this.service.findAll()
        ).toReponseEntity();

    }

    @Override
    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Long id) {
        // If the id is null, return a 400 Bad Request response
        if (id == null) return new APIResponse<User>(
                HttpStatus.BAD_REQUEST,
                "ID cannot be null"
        ).toReponseEntity();

        // If the user does not exist, return a 404 Not Found response
        if (this.service.findById(id) == null) return new APIResponse<User>(
                HttpStatus.NOT_FOUND,
                "User not found"
        ).toReponseEntity();

        // Otherwise, return a 200 OK response with the user
        return new APIResponse<User>(
                HttpStatus.OK,
                this.service.findById(id)
        ).toReponseEntity();
    }

    @Override
    @PostMapping("/")
    public ResponseEntity<?> create(@RequestBody User user) {
        // If the username or password is null, return a 400 Bad Request response
        if (Objects.equals(user.getUsername(), "") || Objects.equals(user.getPassword(), "")) {
            return new APIResponse<User>(
                    HttpStatus.BAD_REQUEST,
                    "Username and password cannot be null"
            ).toReponseEntity();
        }

        // Check if the username already exists
        if (!this.service.findByField("username", user.getUsername()).isEmpty()) {
            return new APIResponse<User>(
                    HttpStatus.CONFLICT,
                    "Username already exists"
            ).toReponseEntity();
        }

        // Otherwise, create the user and return a 201 Created response
        return new APIResponse<User>(
                HttpStatus.CREATED,
                "User created successfully",
                this.service.create(user)
        ).toReponseEntity();
    }

    @Override
    @PatchMapping("/")
    public ResponseEntity<?> update(@RequestBody User user) {
        // Check if the id is null, username or password is null, return a 400 Bad Request response
        if (user.getId() == null ||
                        Objects.equals(user.getUsername(), "") ||
                        Objects.equals(user.getPassword(), "")
        ) {
            return new APIResponse<User>(
                    HttpStatus.BAD_REQUEST,
                    "ID, username and password cannot be null"
            ).toReponseEntity();
        }

        // Check if the user exists, return a 404 Not Found response
        if (this.service.findById(user.getId()) == null) return new APIResponse<User>(
                HttpStatus.NOT_FOUND,
                "User not found"
        ).toReponseEntity();

        // Update the user and return a 200 OK response
        return new APIResponse<User>(
                HttpStatus.OK,
                "User updated successfully",
                this.service.update(user)
        ).toReponseEntity();
    }

    @Override
    @DeleteMapping("/")
    public ResponseEntity<?> delete(@RequestBody User user) {
        // Check if the id is null, return a 400 Bad Request response
        if (user.getId() == null ||  user.getPassword().isEmpty()) {
            return new APIResponse<User>(
                    HttpStatus.BAD_REQUEST,
                    "ID cannot be null"
            ).toReponseEntity();
        }

        // Check if the user exists, return a 404 Not Found response
        if (!this.service.exists(user)) return new APIResponse<User>(
                HttpStatus.NOT_FOUND,
                "User not found"
        ).toReponseEntity();

        // Check if the password is correct, return a 401 Unauthorized response
        if (!this.service.findById(user.getId()).getPassword().equals(user.getPassword())) return new APIResponse<User>(
                HttpStatus.UNAUTHORIZED,
                "Incorrect password"
        ).toReponseEntity();

        // Delete the user and return a 200 OK response
        return new APIResponse<User>(
                HttpStatus.OK,
                "User deleted successfully",
                this.service.delete(user.getId())
        ).toReponseEntity();
    }

    @Override
    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam String query) {
        // If the query is empty, return a 400 Bad Request response
        if (query == null) return new APIResponse<List<User>>(
                HttpStatus.BAD_REQUEST,
                "Query cannot be null"
        ).toReponseEntity();

        // Otherwise, return a 200 OK response with the search results
        return new APIResponse<List<User>>(
                HttpStatus.OK,
                this.service.search("username", query)
        ).toReponseEntity();
    }
}
