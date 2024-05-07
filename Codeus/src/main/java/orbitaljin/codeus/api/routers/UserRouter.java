package orbitaljin.codeus.api.routers;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.websocket.server.PathParam;
import orbitaljin.codeus.store.DBHandler;
import orbitaljin.codeus.store.models.User;
import orbitaljin.codeus.store.repositories.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserRouter {
    private final Repository<User> service;
    public UserRouter() {
        this.service = DBHandler.getInstance().userRepository;
    }
    @PostMapping()
    public void createUser(HttpServletRequest request) {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        if (username == null || password == null) {
            System.out.println("Username or password is null");
            return;
        }
        System.out.println("Creating user...");
        System.out.println("Username: " + username);
        System.out.println("Password: " + password);
        User user = new User(username, password);
        service.create(user);
        System.out.println(user);
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        System.out.println("Getting user...");
        if (id == null) {
            System.out.println("ID is null");
            return null;
        }
        User user = service.findById(id);
        System.out.println(user);
        return user;
    }

    @GetMapping("/all")
    public List<User> getUsers() {
        System.out.println("Getting users...");
        List<User> users = service.findAll();
        System.out.println(users);
        return users;
    }
}
