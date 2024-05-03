package orbitaljin.codeus.api;

import orbitaljin.codeus.store.DBHandler;
import orbitaljin.codeus.store.models.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    private final DBHandler dbHandler = DBHandler.getInstance();
    @PostMapping("/user")
    public void createUser(@RequestParam String username, @RequestParam String password) {
        System.out.println("Creating user...");
        System.out.println("Username: " + username);
        System.out.println("Password: " + password);
        User user = new User(username, password);
        dbHandler.userRepository.create(user);
        System.out.println(user);
    }

    @GetMapping("/user/")
    public User getUser(@RequestParam Long id) {
        System.out.println("Getting user...");
        System.out.println("Username: " + id);
        User user = dbHandler.userRepository.findById(id);
        System.out.println(user);
        return user;
    }
}
