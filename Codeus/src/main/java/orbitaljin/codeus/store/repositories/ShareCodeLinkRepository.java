package orbitaljin.codeus.store.repositories;

import orbitaljin.codeus.store.models.ShareCodeLink;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import java.util.List;

public class ShareCodeLinkRepository implements Repository<ShareCodeLink> {
    private final SessionFactory sf;

    public ShareCodeLinkRepository(SessionFactory sf) {
        this.sf = sf;
    }

    @Override
    public ShareCodeLink create(ShareCodeLink entity) {
        Transaction transaction = null;

        try (Session session = this.sf.openSession()) {
            transaction = session.beginTransaction();
            Long id = (Long) session.save(entity);
            entity.setId(id);
            transaction.commit();
            return entity;
        }
        catch (Exception e)
        {
            if (transaction != null) transaction.rollback();
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public void delete(ShareCodeLink entity){
        Transaction transaction = null;

        try (Session session = this.sf.openSession()) {
            transaction = session.beginTransaction();
            session.remove(entity);
            transaction.commit();
        }
        catch (Exception e) {
            if (transaction != null) transaction.rollback();
            e.printStackTrace();
        }
    }

    @Override
    public void update(ShareCodeLink entity) {
        Transaction transaction = null;

        try (Session session = this.sf.openSession()) {
            transaction = session.beginTransaction();
            session.update(entity);
            transaction.commit();
        }
        catch (Exception e) {
            if (transaction != null) transaction.rollback();
            e.printStackTrace();
        }
    }

    @Override
    public ShareCodeLink findById(Long id) {
        Transaction transaction = null;

        try (Session session = this.sf.openSession()) {
            transaction = session.beginTransaction();
            ShareCodeLink shareCodeLink = session.get(ShareCodeLink.class, id);
            transaction.commit();
            return shareCodeLink;
        }
        catch (Exception e) {
            if (transaction != null) transaction.rollback();
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<ShareCodeLink> findAll() {
        Transaction transaction = null;

        try (Session session = this.sf.openSession()) {
            transaction = session.beginTransaction();
            List<ShareCodeLink> shareCodeLinks = session.createQuery("from share_code_links", ShareCodeLink.class).list();
            transaction.commit();
            return shareCodeLinks;
        }
        catch (Exception e) {
            if (transaction != null) transaction.rollback();
            e.printStackTrace();
        }
        return null;
    }
    @Override
    public boolean exists(String label) {
        return false;
    }

    @Override
    public List<ShareCodeLink> fuzzySearch(String keyword) {
        return null;
    }

    @Override
    public List<ShareCodeLink> findByField(String field, String value) {
        return null;
    }

}

