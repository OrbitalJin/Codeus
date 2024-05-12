package orbitaljin.codeus.store.repositories;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import orbitaljin.codeus.store.models.Post;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import java.util.List;

public class PostRepository implements Repository<Post> {
    private final SessionFactory sf;

    public PostRepository(SessionFactory sf) {
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
        } catch (Exception e) {
            if (transaction != null) transaction.rollback();
            e.printStackTrace();
        }
        return entity;
    }

    @Override
    public Post delete(Long id) {
        Transaction transaction = null;
        Post post = null;

        try(Session session = this.sf.openSession()) {
            transaction = session.beginTransaction();
            post = session.get(Post.class, id);
            session.detach(post);

            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) transaction.rollback();
            e.printStackTrace();
        }
        return post;
    }

    @Override
    public Post update(Post entity) {
        Transaction transaction = null;

        try(Session session = this.sf.openSession()) {
            transaction = session.beginTransaction();
            session.update(entity);
            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) transaction.rollback();
            e.printStackTrace();
        }
        return entity;
    }

    @Override
    public Post findById(Long id) {
        Transaction transaction = null;
        Post post = null;

        try (Session session = this.sf.openSession()) {
            transaction = session.beginTransaction();
            post = session.get(Post.class, id);
            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) transaction.rollback();
            e.printStackTrace();
        }
        return post;
    }

    @Override
    public List<Post> findAll() {
        Transaction transaction = null;
        List<Post> posts = null;

        try (Session session = this.sf.openSession()) {
            transaction = session.beginTransaction();

            CriteriaBuilder builder = this.sf.getCriteriaBuilder();
            CriteriaQuery<Post> query = builder.createQuery(Post.class);
            Root<Post> root = query.from(Post.class);
            query.select(root);
            posts = session.createQuery(query).getResultList();

            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) transaction.rollback();
            e.printStackTrace();
        }
        return posts;
    }

    @Override
    public List<Post> findByField(String field, Object value) {
        Transaction transaction = null;
        List<Post> posts = null;

        try (Session session = this.sf.openSession()) {
            transaction = session.beginTransaction();

            CriteriaBuilder builder = this.sf.getCriteriaBuilder();
            CriteriaQuery<Post> query = builder.createQuery(Post.class);
            Root<Post> root = query.from(Post.class);

            Predicate predicate = builder.equal(
                    builder.lower(root.get(field)),
                    (value instanceof String) ?
                            ((String) value).toLowerCase() :
                            value

            );
            query.where(predicate);
            posts = session.createQuery(query).getResultList();

            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) transaction.rollback();
            e.printStackTrace();
        }
        return posts;
    }

    @Override
    public List<Post> search(String query) {
        return this.findByField("title", query);
    }

    @Override
    public boolean exists(Post entity) {
        return this.findById(entity.getId()) != null;
    }

}
