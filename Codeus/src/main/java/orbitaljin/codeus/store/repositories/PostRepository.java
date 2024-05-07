package orbitaljin.codeus.store.repositories;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import orbitaljin.codeus.store.models.Post;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import java.util.List;

public class PostRepository implements Repository<Post>{
    private final SessionFactory sf;

    public PostRepository(SessionFactory sf){
        this.sf = sf;
    }

    @Override
    public Post create(Post entity) {
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
    public void delete(Post entity) {
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
    public void update(Post entity) {
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
    public Post findById(Long id) {
        Transaction transaction = null;

        try (Session session = this.sf.openSession()) {
            transaction = session.beginTransaction();
            Post post = session.get(Post.class, id);
            transaction.commit();
            return post;
        } catch (Exception e) {
            if (transaction != null) transaction.rollback();
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<Post> findAll() {
        Transaction transaction = null;
        List<Post> posts = null;

        try (Session session = this.sf.openSession()) {
            transaction = session.beginTransaction();

            CriteriaBuilder builder = session.getCriteriaBuilder();
            CriteriaQuery<Post> criteriaQuery = builder.createQuery(Post.class);
            Root<Post> root = criteriaQuery.from(Post.class);
            criteriaQuery.select(root);

            posts = session.createQuery(criteriaQuery).getResultList();

            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) transaction.rollback();
            e.printStackTrace();
        }

        return posts;
    }

}
