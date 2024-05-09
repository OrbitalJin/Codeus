package orbitaljin.codeus.store.repositories;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import orbitaljin.codeus.store.models.Thread;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import java.util.List;


public class ThreadRepository implements Repository<Thread>{
    private final SessionFactory sf;

    public ThreadRepository(SessionFactory sf){
        this.sf = sf;
    }

    @Override
    public Thread create(Thread entity) {
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
    public Thread delete(Long id) {
        Transaction transaction = null;
        Thread thread = null;

        try (Session session = this.sf.openSession()) {
            transaction = session.beginTransaction();
            thread = session.get(Thread.class, id);
            session.remove(thread);
            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) transaction.rollback();
            e.printStackTrace();
        }
        return thread;
    }

    @Override
    public Thread update(Thread entity) {
        Transaction transaction = null;

        try (Session session = this.sf.openSession()) {
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
    public Thread findById(Long id) {
        Transaction transaction = null;

        try (Session session = this.sf.openSession()) {
            transaction = session.beginTransaction();
            Thread thread = session.get(Thread.class, id);
            transaction.commit();
            return thread;
        } catch (Exception e) {
            if (transaction != null) transaction.rollback();
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<Thread> findAll() {
        Transaction transaction = null;
        List<Thread> threads = null;

        try (Session session = this.sf.openSession()) {
            transaction = session.beginTransaction();

            CriteriaBuilder builder = session.getCriteriaBuilder();
            CriteriaQuery<Thread> query = builder.createQuery(Thread.class);
            Root<Thread> root = query.from(Thread.class);
            query.select(root);

            threads = session.createQuery(query).getResultList();
            transaction.commit();

        } catch (Exception e) {
            if (transaction != null) transaction.rollback();
            e.printStackTrace();
        }
        return threads;
    }

    @Override
    public List<Thread> search(String fuzzy) {
        Transaction transaction = null;
        List<Thread> threads = null;

        try (Session session = this.sf.openSession()) {
            transaction = session.beginTransaction();

            CriteriaBuilder builder = session.getCriteriaBuilder();
            CriteriaQuery<Thread> query = builder.createQuery(Thread.class);
            Root<Thread> root = query.from(Thread.class);

            Predicate predicate = builder.like(root.get("title"), "%" + fuzzy + "%");
            query.where(predicate);

            threads = session.createQuery(query).getResultList();
            transaction.commit();

        } catch (Exception e) {
            if (transaction != null) transaction.rollback();
            e.printStackTrace();
        }
        return threads;
    }

    @Override
    public boolean exists(Thread entity) {
        return this.findById(entity.getId()) != null;
    }

    @Override
    public List<Thread> findByField(String field, String value) {
        Transaction transaction = null;
        List<Thread> threads = null;

        try (Session session = this.sf.openSession()) {
            transaction = session.beginTransaction();

            CriteriaBuilder builder = session.getCriteriaBuilder();
            CriteriaQuery<Thread> query = builder.createQuery(Thread.class);
            Root<Thread> root = query.from(Thread.class);

            Predicate predicate = builder.equal(
                    builder.lower(root.get(field)),
                    value.toLowerCase()
            );
            query.where(predicate);

            threads = session.createQuery(query).getResultList();
            transaction.commit();

        } catch (Exception e) {
            if (transaction != null) transaction.rollback();
            e.printStackTrace();
        }
        return threads;
    }

}
