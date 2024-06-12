package orbitaljin.codeus.store.repositories;

import orbitaljin.codeus.store.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    User findByUsername(String username);
    List<User> findByUsernameContaining(String username);
}
