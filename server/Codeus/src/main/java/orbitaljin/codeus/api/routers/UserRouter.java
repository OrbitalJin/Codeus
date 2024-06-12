package orbitaljin.codeus.api.routers;

import orbitaljin.codeus.api.APIResponse;
import orbitaljin.codeus.store.models.User;
import orbitaljin.codeus.store.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/users")
public class UserRouter implements Router<User> {
    @Autowired
    private UserService service;

    @Override
    @GetMapping("/")
    public ResponseEntity<?> getAll() {
        // Return all users
        return new APIResponse<List<User>>(
                HttpStatus.OK,
                this.service.getAllUsers()
        ).toReponseEntity();

    }

    @Override
    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable String id) {
        // If the id is null, return a 400 Bad Request response
        if (id == null) return new APIResponse<User>(
                HttpStatus.BAD_REQUEST,
                "ID cannot be null"
        ).toReponseEntity();

        // If the user does not exist, return a 404 Not Found response
        if (this.service.getUserById(id) == null) return new APIResponse<User>(
                HttpStatus.NOT_FOUND,
                "User not found"
        ).toReponseEntity();

        // Otherwise, return a 200 OK response with the user
        return new APIResponse<User>(
                HttpStatus.OK,
                this.service.getUserById(id)
        ).toReponseEntity();
    }

    @Override
    @PostMapping("/")
    public ResponseEntity<?> create(@RequestBody User user) {
        // If the username or password is null, return a 400 Bad Request response
        if (Objects.equals(user.getUsername(), "") || Objects.equals(user.getEmail(), "") || Objects.equals(user.getHandle(), "")) {
            return new APIResponse<User>(
                    HttpStatus.BAD_REQUEST,
                    "Username, email or handlw cannot be null"
            ).toReponseEntity();
        }

        // Check if the username already exists
        if (this.service.getUserByUsername(user.getUsername()) != null) {
            return new APIResponse<User>(
                    HttpStatus.CONFLICT,
                    "Username already exists"
            ).toReponseEntity();
        }

        // Otherwise, create the user and return a 201 Created response
        return new APIResponse<User>(
                HttpStatus.CREATED,
                "User created successfully",
                this.service.createUser(user)
        ).toReponseEntity();
    }

    @Override
    @PatchMapping("/")
    public ResponseEntity<?> update(@RequestBody User user) {
        // Check if the id is null, username or password is null, return a 400 Bad Request response
        if (user.getId() == null ||Objects.equals(user.getUsername(), "")) {
            return new APIResponse<User>(
                    HttpStatus.BAD_REQUEST,
                    "ID, username and password cannot be null"
            ).toReponseEntity();
        }

        // Check if the user exists, return a 404 Not Found response
        if (this.service.getUserById(user.getId()) == null) return new APIResponse<User>(
                HttpStatus.NOT_FOUND,
                "User not found"
        ).toReponseEntity();

        // Update the user and return a 200 OK response
        return new APIResponse<User>(
                HttpStatus.OK,
                "User updated successfully",
                this.service.updateUser(user)
        ).toReponseEntity();
    }

    @Override
    @DeleteMapping("/")
    public ResponseEntity<?> delete(@RequestBody User user) {
        // Check if the id is null, return a 400 Bad Request response
        if (user.getId() == null) {
            return new APIResponse<User>(
                    HttpStatus.BAD_REQUEST,
                    "ID cannot be null"
            ).toReponseEntity();
        }

        // Check if the user exists, return a 404 Not Found response
        if (this.service.getUserById(user.getId()) == null) return new APIResponse<User>(
                HttpStatus.NOT_FOUND,
                "User not found"
        ).toReponseEntity();

        this.service.deleteUser(user.getId());
        return new APIResponse<>(
                HttpStatus.OK,
                "User deleted successfully"
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
                this.service.searchByUsername(query)
        ).toReponseEntity();
    }
}
