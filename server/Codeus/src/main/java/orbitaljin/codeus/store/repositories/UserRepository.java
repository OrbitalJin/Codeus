package orbitaljin.codeus.store.repositories;

import orbitaljin.codeus.store.models.User;
import org.hibernate.SessionFactory;

public class UserRepository extends RepositoryImpl<User> {

    public UserRepository(SessionFactory sf) {
        super(sf, User.class);
    }

}
