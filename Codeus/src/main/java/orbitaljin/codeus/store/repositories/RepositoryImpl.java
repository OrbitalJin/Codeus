package orbitaljin.codeus.store.repositories;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import orbitaljin.codeus.store.models.Model;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import java.util.List;

public class RepositoryImpl<T extends Model> implements Repository<T> {
    private final SessionFactory sf;
    private final Class<T> entityClass;

    public RepositoryImpl(
            SessionFactory sf,
            Class<T> entityClass
    ) {
        this.sf = sf;
        this.entityClass = entityClass;
    }

    @Override
    public T create(T entity) {
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
    public T delete(Long id) {
        Transaction transaction = null;
        T entity = null;

        try(Session session = this.sf.openSession()) {
            transaction = session.beginTransaction();
            entity = session.get(this.entityClass, id);
            session.detach(entity);

            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) transaction.rollback();
            e.printStackTrace();
        }
        return entity;
    }

    @Override
    public T delete(T entity) {
        return this.delete(entity.getId());
    }

    @Override
    public T update(T entity) {
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
    public T findById(Long id) {
        Transaction transaction = null;
        T entity = null;

        try (Session session = this.sf.openSession()) {
            transaction = session.beginTransaction();
            entity = session.get(this.entityClass, id);
            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) transaction.rollback();
            e.printStackTrace();
        }
        return entity;
    }

    @Override
    public List<T> findAll() {
        Transaction transaction = null;
        List<T> entities = null;

        try (Session session = this.sf.openSession()) {
            transaction = session.beginTransaction();

            CriteriaBuilder builder = this.sf.getCriteriaBuilder();
            CriteriaQuery<T> query = builder.createQuery(this.entityClass);
            Root<T> root = query.from(this.entityClass);
            query.select(root);
            entities = session.createQuery(query).getResultList();

            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) transaction.rollback();
            e.printStackTrace();
        }
        return entities;
    }

    @Override
    public List<T> findByField(String field, Object value) {
        Transaction transaction = null;
        List<T> entities = null;

        try (Session session = this.sf.openSession()) {
            transaction = session.beginTransaction();

            CriteriaBuilder builder = this.sf.getCriteriaBuilder();
            CriteriaQuery<T> query = builder.createQuery(this.entityClass);
            Root<T> root = query.from(this.entityClass);

            Predicate predicate = builder.equal(
                    builder.lower(root.get(field)),
                    (value instanceof String) ?
                            ((String) value).toLowerCase() :
                            value

            );
            query.where(predicate);
            entities = session.createQuery(query).getResultList();

            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) transaction.rollback();
            e.printStackTrace();
        }
        return entities;
    }

    // Fuzzy search
    @Override
    public List<T> search(String field, String fuzzy) {
        Transaction transaction = null;
        List<T> entities = null;

        try (Session session = this.sf.openSession()) {
            transaction = session.beginTransaction();

            CriteriaBuilder builder = session.getCriteriaBuilder();
            CriteriaQuery<T> query = builder.createQuery(this.entityClass);
            Root<T> root = query.from(this.entityClass);

            Predicate predicate = builder.like(
                    root.get(field),
                    "%" + fuzzy + "%"
            );
            query.where(predicate);

            entities = session.createQuery(query).getResultList();
            transaction.commit();

        } catch (Exception e) {
            if (transaction != null) transaction.rollback();
            e.printStackTrace();
        }
        return entities;
    }

    @Override
    public boolean exists(T entity) {
        return this.findById(entity.getId()) != null;
    }

    @Override
    public boolean exists(Long id) {
        return this.findById(id) != null;
    }
}
