package orbitaljin.codeus.store.repositories;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import orbitaljin.codeus.store.models.Comment;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import java.util.List;

public class CommentRepository implements Repository<Comment> {
    private final SessionFactory sf;

    public CommentRepository(SessionFactory sf){
        this.sf = sf;
    }

    @Override
    public Comment create(Comment entity) {
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
    public void delete(Comment entity) {
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
    public void update(Comment entity) {
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
    public Comment findById(Long id) {
        try (Session session = this.sf.openSession()) {
            return session.get(Comment.class, id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<Comment> findAll() {
        try (Session session = this.sf.openSession()) {
            return session.createQuery("from comments", Comment.class).list();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<Comment> fuzzySearch(String fuzzy) {
        Transaction transaction = null;
        List<Comment> comments = null;

        try(Session session = this.sf.openSession()) {
            transaction = session.beginTransaction();

            CriteriaBuilder builder = session.getCriteriaBuilder();
            CriteriaQuery<Comment> query = builder.createQuery(Comment.class);
            Root<Comment> root = query.from(Comment.class);

            Predicate predicate = builder.like(root.get("content"), "%" + fuzzy + "%");
            query.where(predicate);

            comments = session.createQuery(query).getResultList();
            transaction.commit();

        } catch (Exception e) {
            if (transaction != null) transaction.rollback();
            e.printStackTrace();
        }
        return comments;
    }

    @Override
    public boolean exists(String label) {
        return false;
    }
}
