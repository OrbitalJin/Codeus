package orbitaljin.codeus.store.repositories;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import orbitaljin.codeus.store.models.Post;
import orbitaljin.codeus.store.models.Tag;
import orbitaljin.codeus.store.models.User;
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
        List<Tag> tags = null;

        try (Session session = this.sf.openSession()) {
            transaction = session.beginTransaction();

            CriteriaBuilder builder = session.getCriteriaBuilder();
            CriteriaQuery<Tag> criteriaQuery = builder.createQuery(Tag.class);
            Root<Tag> root = criteriaQuery.from(Tag.class);
            criteriaQuery.select(root);

            tags = session.createQuery(criteriaQuery).getResultList();

            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) transaction.rollback();
            e.printStackTrace();
        }
        return tags;
    }

    public List<Tag> fuzzySearch(String fuzzy) {
        Transaction transaction = null;
        List<Tag> posts = null;

        try (Session session = this.sf.openSession()) {
            transaction = session.beginTransaction();

            CriteriaBuilder builder = session.getCriteriaBuilder();
            CriteriaQuery<Tag> query = builder.createQuery(Tag.class);
            Root<Tag> root = query.from(Tag.class);

            Predicate predicate = builder.like(root.get("name"), "%" + fuzzy + "%");
            query.where(predicate);

            posts = session.createQuery(query).getResultList();
            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) transaction.rollback();
            e.printStackTrace();
        }

        return posts;
    }

    public List<Tag> findByField(String field, String value) {
        Transaction transaction = null;
        List<Tag> tags = null;

        try (Session session = this.sf.openSession()) {
            transaction = session.beginTransaction();

            CriteriaBuilder builder = session.getCriteriaBuilder();
            CriteriaQuery<Tag> query = builder.createQuery(Tag.class);
            Root<Tag> root = query.from(Tag.class);

            Predicate predicate = builder.equal(
                    builder.lower(root.get(field)),
                    value.toLowerCase()
            );

            query.where(predicate);
            tags = session.createQuery(query).getResultList();
            transaction.commit();

        } catch (Exception e) {
            if (transaction != null) transaction.rollback();
            e.printStackTrace();
        }
        return tags;
    }

    @Override
    public boolean exists(String label) {
        List<Tag> tags = this.findByField("name", label);
        return tags.size() > 0;
    }
}
