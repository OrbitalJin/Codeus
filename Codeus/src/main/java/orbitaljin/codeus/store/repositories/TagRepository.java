package orbitaljin.codeus.store.repositories;

import orbitaljin.codeus.store.models.Tag;
import org.hibernate.SessionFactory;

public class TagRepository extends RepositoryImpl<Tag> {
    public TagRepository(SessionFactory sf) {
        super(sf, Tag.class);
    }
}
