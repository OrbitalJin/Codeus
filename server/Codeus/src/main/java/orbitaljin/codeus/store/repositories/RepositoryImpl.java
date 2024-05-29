package orbitaljin.codeus.store.repositories;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.transaction.Transactional;
import orbitaljin.codeus.store.models.Model;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

import java.util.List;

public class RepositoryImpl<T extends Model> implements Repository<T> {
    private final SessionFactory sf;
    private final Class<T> entityClass;

    public RepositoryImpl(SessionFactory sf, Class<T> entityClass) {
        this.sf = sf;
        this.entityClass = entityClass;
    }

    @Override
    @Transactional
    public T create(T entity) {
        try (Session session = this.sf.openSession()) {
            Long id = (Long) session.save(entity);
            entity.setId(id);
        } catch (Exception e) {
            e.printStackTrace();
            throw e; // Re-throw to ensure transaction rollback
        }
        return entity;
    }

    @Override
    @Transactional
    public T delete(Long id) {
        T entity = null;
        try (Session session = this.sf.openSession()) {
            entity = session.get(this.entityClass, id);
            session.delete(entity);
        } catch (Exception e) {
            e.printStackTrace();
            throw e; // Re-throw to ensure transaction rollback
        }
        return entity;
    }

    @Override
    @Transactional
    public T delete(T entity) {
        return this.delete(entity.getId());
    }

    @Override
    @Transactional
    public T update(T entity) {
        try (Session session = this.sf.openSession()) {
            session.update(entity);
        } catch (Exception e) {
            e.printStackTrace();
            throw e; // Re-throw to ensure transaction rollback
        }
        return entity;
    }

    @Override
    @Transactional
    public T findById(Long id) {
        T entity = null;
        try (Session session = this.sf.openSession()) {
            entity = session.get(this.entityClass, id);
        } catch (Exception e) {
            e.printStackTrace();
            throw e; // Re-throw to ensure transaction rollback
        }
        return entity;
    }

    @Override
    @Transactional
    public List<T> findAll() {
        List<T> entities = null;
        try (Session session = this.sf.openSession()) {
            CriteriaBuilder builder = this.sf.getCriteriaBuilder();
            CriteriaQuery<T> query = builder.createQuery(this.entityClass);
            Root<T> root = query.from(this.entityClass);
            query.select(root);
            entities = session.createQuery(query).getResultList();
        } catch (Exception e) {
            e.printStackTrace();
            throw e; // Re-throw to ensure transaction rollback
        }
        return entities;
    }

    @Override
    @Transactional
    public List<T> findByField(String field, Object value) {
        List<T> entities = null;
        try (Session session = this.sf.openSession()) {
            CriteriaBuilder builder = this.sf.getCriteriaBuilder();
            CriteriaQuery<T> query = builder.createQuery(this.entityClass);
            Root<T> root = query.from(this.entityClass);

            Predicate predicate = builder.equal(
                    builder.lower(root.get(field)),
                    (value instanceof String) ? ((String) value).toLowerCase() : value
            );
            query.where(predicate);
            entities = session.createQuery(query).getResultList();
        } catch (Exception e) {
            e.printStackTrace();
            throw e; // Re-throw to ensure transaction rollback
        }
        return entities;
    }

    @Override
    @Transactional
    public List<T> findByFields(String[] fields, Object[] values) {
        List<T> entities = null;

        if (fields == null || values == null || fields.length != values.length) {
            throw new IllegalArgumentException("Fields and values must not be null and must have the same length.");
        }

        try (Session session = this.sf.openSession()) {
            CriteriaBuilder builder = session.getCriteriaBuilder();
            CriteriaQuery<T> query = builder.createQuery(this.entityClass);
            Root<T> root = query.from(this.entityClass);

            Predicate[] predicates = new Predicate[fields.length];
            for (int i = 0; i < fields.length; i++) {
                if (fields[i] == null || values[i] == null) {
                    throw new IllegalArgumentException("Field and value at index " + i + " must not be null.");
                }

                predicates[i] = builder.equal(root.get(fields[i]),
                        (values[i] instanceof String) ? ((String) values[i]).toLowerCase() : values[i]
                );
            }

            query.where(predicates);
            entities = session.createQuery(query).getResultList();
        } catch (Exception e) {
            e.printStackTrace();
            throw e; // Re-throw to ensure transaction rollback
        }

        return entities;
    }

    @Override
    @Transactional
    public List<T> search(String field, String fuzzy) {
        List<T> entities = null;
        try (Session session = this.sf.openSession()) {
            CriteriaBuilder builder = session.getCriteriaBuilder();
            CriteriaQuery<T> query = builder.createQuery(this.entityClass);
            Root<T> root = query.from(this.entityClass);

            Predicate predicate = builder.like(
                    builder.lower(root.get(field)),
                    "%" + fuzzy.toLowerCase() + "%"
            );
            query.where(predicate);
            entities = session.createQuery(query).getResultList();
        } catch (Exception e) {
            e.printStackTrace();
            throw e; // Re-throw to ensure transaction rollback
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
