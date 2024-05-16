package orbitaljin.codeus.store.repositories;

import orbitaljin.codeus.store.models.Comment;
import org.hibernate.SessionFactory;

public class CommentRepository extends RepositoryImpl<Comment> {
        public CommentRepository(SessionFactory sf) {
            super(sf, Comment.class);
        }
}
