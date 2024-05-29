package orbitaljin.codeus.store.repositories;

import orbitaljin.codeus.store.models.Bookmark;
import org.hibernate.SessionFactory;

public class BookmarkRepository extends RepositoryImpl<Bookmark> {
    public BookmarkRepository(SessionFactory sf) {
        super(sf, Bookmark.class);
    }
}
