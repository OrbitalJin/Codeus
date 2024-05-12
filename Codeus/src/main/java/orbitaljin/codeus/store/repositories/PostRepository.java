package orbitaljin.codeus.store.repositories;

import orbitaljin.codeus.store.models.Post;
import org.hibernate.SessionFactory;

public class PostRepository extends RepositoryImpl<Post> {

    public PostRepository(SessionFactory sf) {
        super(sf, Post.class);
    }

}
