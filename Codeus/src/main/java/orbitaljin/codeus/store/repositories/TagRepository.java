package orbitaljin.codeus.store.repositories;

import orbitaljin.codeus.store.models.Tag;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import java.util.List;

public class TagRepository implements Repository<Tag>{
    private final SessionFactory sf;

    public TagRepository(SessionFactory sf){
        this.sf = sf;
    }

    @Override
    public Tag create(Tag entity) {
        Transaction transaction = null;

        try (Session session = this.sf.openSession()) {
            transaction = session.beginTransaction();
            Long id = (Long) session.save(entity);
            entity.setId(id);
            transaction.commit();
            return entity;
        } catch (Exception e) {
            if (transaction != null) transaction.rollback();
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public void delete(Tag entity) {
        Transaction transaction = null;

        try (Session session = this.sf.openSession()) {
            transaction = session.beginTransaction();
            session.remove(entity);
            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) transaction.rollback();
            e.printStackTrace();
        }
    }

    @Override
    public void update(Tag entity) {
        Transaction transaction = null;

        try (Session session = this.sf.openSession()) {
            transaction = session.beginTransaction();
            session.update(entity);
            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) transaction.rollback();
            e.printStackTrace();

        }
    }

    @Override
    public Tag findById(Long id) {
        Transaction transaction = null;

        try (Session session = this.sf.openSession()) {
            transaction = session.beginTransaction();
            Tag tag = session.get(Tag.class, id);
            transaction.commit();
            return tag;
        } catch (Exception e) {
            if (transaction != null) transaction.rollback();
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<Tag> findAll() {
        Transaction transaction = null;

        try (Session session = this.sf.openSession()) {
            transaction = session.beginTransaction();
            List<Tag> tags = session.createQuery("from tags", Tag.class).list();
            transaction.commit();
            return tags;
        } catch (Exception e) {
            if (transaction != null) transaction.rollback();
            e.printStackTrace();
        }
        return null;
    }
}
