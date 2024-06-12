package orbitaljin.codeus.store.services;


import jakarta.transaction.Transactional;
import orbitaljin.codeus.store.models.User;
import orbitaljin.codeus.store.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Transactional
    public User getUserById(String id) {
        return userRepository.findById(id).orElse(null);
    }

    @Transactional
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Transactional
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Transactional
    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }

    @Transactional
    public User updateUser(User user) {
        return userRepository.save(user);
    }


    @Transactional
    public List<User> searchByUsername(String username) {
        return userRepository.findByUsernameContaining(username);
    }
}
