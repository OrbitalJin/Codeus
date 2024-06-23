package orbitaljin.codeus.store.services;

import orbitaljin.codeus.store.models.Thread;
import orbitaljin.codeus.store.repositories.ThreadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ThreadService {
    @Autowired
    private ThreadRepository repository;

    public List<Thread> getAllThreads() {
        return this.repository.findByOrderByCreatedAtDesc();
    }

    public Thread getThreadById(String id) {
        return this.repository.findById(id).orElse(null);
    }

    public Thread createThread(Thread thread) {
        return this.repository.save(thread);
    }

    public void deleteThread(String id) {
        this.repository.deleteById(id);
    }

    public List<Thread> search(String title) {
        return this.repository.findByDescriptionContaining(title);
    }

    public void updateThread(Thread thread) {
        this.repository.save(thread);
    }

}
