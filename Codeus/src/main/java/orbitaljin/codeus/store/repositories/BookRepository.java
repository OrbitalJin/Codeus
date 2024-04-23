package orbitaljin.codeus.store.repositories;

import orbitaljin.codeus.store.models.Book;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import java.util.List;

public class BookRepository {
    private final SessionFactory sf;
    public BookRepository(SessionFactory sf) {
        this.sf = sf;
    }
    public Book create(Book book) {
        Transaction transaction = null;

        try (Session session = this.sf.openSession()) {
            transaction = session.beginTransaction();
            Long id = (Long) session.save(book);
            book.setId(id);
            transaction.commit();
            return book;
        } catch (Exception e) {
            if (transaction != null) transaction.rollback();
            e.printStackTrace();
        }
        return null;
    }

    public Book update(Book book) {
        Transaction transaction = null;

        try (Session session = this.sf.openSession()) {
            transaction = session.beginTransaction();
            session.update(book);
            transaction.commit();
            return book;
        } catch (Exception e) {
            if (transaction != null) transaction.rollback();
            e.printStackTrace();
        }
        return null;
    }

    public void delete(Book book) {
        Transaction transaction = null;

        try (Session session = this.sf.openSession()) {
            transaction = session.beginTransaction();
            session.remove(book);
            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) transaction.rollback();
            e.printStackTrace();
        }
    }
    public Book get(Long id) {
        Transaction transaction = null;

        try (Session session = this.sf.openSession()) {
            transaction = session.beginTransaction();
            Book login = session.get(Book.class, id);
            transaction.commit();
            return login;
        } catch (Exception e) {
            if (transaction != null) transaction.rollback();
            e.printStackTrace();
        }
        return null;
    }

    public java.util.List<Book> getAll() {
        Transaction transaction = null;

        try (Session session = this.sf.openSession()) {
            transaction = session.beginTransaction();
            List<Book> logins = session.createQuery("from Book", Book.class).list();
            transaction.commit();
            return logins;
        } catch (Exception e) {
            System.out.println("Error: " + e);
            if (transaction != null) transaction.rollback();
        }
        return null;
    }
}
