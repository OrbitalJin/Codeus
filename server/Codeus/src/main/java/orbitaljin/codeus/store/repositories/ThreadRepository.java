package orbitaljin.codeus.store.repositories;

import orbitaljin.codeus.store.models.Thread;
import org.hibernate.SessionFactory;

public class ThreadRepository extends RepositoryImpl<Thread> {

    public ThreadRepository(SessionFactory sf) {
        super(sf, Thread.class);
    }

}
