package orbitaljin.codeus.store.repositories;

import orbitaljin.codeus.store.models.Thread;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ThreadRepository extends JpaRepository<Thread, String>{
    List<Thread> findByDescriptionContaining(String description);
    List<Thread> findByOrderByCreatedAtDesc();
}
