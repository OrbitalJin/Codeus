package orbitaljin.codeus.api.routers;

import orbitaljin.codeus.api.errors.APIResponse;
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
public class UserRouter {
    private final Repository<User> service;
    public UserRouter() {
        this.service = DBHandler.getInstance().userRepository;
    }
    @GetMapping("/")
    public ResponseEntity<?> getUsers() {
        // Return all users
        return new APIResponse<List<User>>(
                HttpStatus.OK,
                this.service.findAll()
        ).toReponseEntity();

    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id) {
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

    @PostMapping("/")
    public ResponseEntity<?> createUser(
            @RequestParam String username,
            @RequestParam String password
    ) {
        // If the username or password is null, return a 400 Bad Request response
        if (Objects.equals(username, "") || Objects.equals(password, "")) {
            return new APIResponse<User>(
                    HttpStatus.BAD_REQUEST,
                    "Username and password cannot be null"
            ).toReponseEntity();
        }

        // Check if the username already exists
        if (this.service.exists(username)) {
            return new APIResponse<User>(
                    HttpStatus.CONFLICT,
                    "Username already exists"
            ).toReponseEntity();
        }

        // Otherwise, create the user and return a 201 Created response
        return new APIResponse<User>(
                HttpStatus.CREATED,
                this.service.create(new User(
                        username,
                        password
                ))
        ).toReponseEntity();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateUser(
            @PathVariable Long id,
            @RequestParam String username,
            @RequestParam String password
    ) {
        // Check if the id is null, username or password is null, return a 400 Bad Request response
        if (id == null || Objects.equals(username, "") || Objects.equals(password, "")) {
            return new APIResponse<User>(
                    HttpStatus.BAD_REQUEST,
                    "ID, username and password cannot be null"
            ).toReponseEntity();
        }

        // Check if the user exists, return a 404 Not Found response
        if (this.service.findById(id) == null) return new APIResponse<User>(
                HttpStatus.NOT_FOUND,
                "User not found"
        ).toReponseEntity();

        // Update the user and return a 200 OK response
        return new APIResponse<User>(
                HttpStatus.OK,
                "User updated successfully",
                this.service.update(new User(
                        id,
                        username,
                        password
                ))
        ).toReponseEntity();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(
            @PathVariable Long id,
            @RequestParam String password
            ) {
        // Check if the id or password is null, return a 400 Bad Request response
        if (id == null || Objects.equals(password, "")) {
            return new APIResponse<User>(
                    HttpStatus.BAD_REQUEST,
                    "ID and password cannot be null"
            ).toReponseEntity();
        }

        // Check if the user exists, return a 404 Not Found response
        if (this.service.findById(id) == null) return new APIResponse<User>(
                HttpStatus.NOT_FOUND,
                "User not found"
        ).toReponseEntity();

        // Check if the password is correct, return a 401 Unauthorized response
        if (!this.service.findById(id).getPassword().equals(password)) return new APIResponse<User>(
                HttpStatus.UNAUTHORIZED,
                "Incorrect password"
        ).toReponseEntity();

        // Delete the user and return a 200 OK response
        return new APIResponse<User>(
                HttpStatus.OK,
                "User deleted successfully",
                this.service.delete(id)
        ).toReponseEntity();
    }

    @GetMapping("/search")
    public ResponseEntity<?> fuzzySearch(@RequestParam String query) {
        // If the query is empty, return a 400 Bad Request response
        if (query == null) return new APIResponse<List<User>>(
                HttpStatus.BAD_REQUEST,
                "Query cannot be null"
        ).toReponseEntity();

        // Otherwise, return a 200 OK response with the search results
        return new APIResponse<List<User>>(
                HttpStatus.OK,
                this.service.fuzzySearch(query)
        ).toReponseEntity();
    }
}
