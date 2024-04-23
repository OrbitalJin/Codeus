package orbitaljin.codeus.store;

import orbitaljin.codeus.store.repositories.BookRepository;

import orbitaljin.codeus.store.models.Book;

import org.hibernate.cfg.Configuration;
import org.hibernate.SessionFactory;

// I Used the Singleton pattern to ensure that only one instance of the DBHandler is created
public class DBHandler {
    private static DBHandler instance;
    private SessionFactory sessionFactory;
    public BookRepository bookRepository;

    private DBHandler() {
        try {
            Configuration configuration = new Configuration()
                    .setProperty("hibernate.connection.url", "jdbc:sqlite:codeus.db")
                    .setProperty("hibernate.connection.driver_class", "org.sqlite.JDBC")
                    .setProperty("hibernate.dialect", "org.hibernate.community.dialect.SQLiteDialect")
                    .setProperty("hibernate.connection.username", "")
                    .setProperty("hibernate.connection.password", "")
                    .setProperty("hibernate.show_sql", "true")
                    .setProperty("hibernate.hbm2ddl.auto", "update")
                    .setProperty("hibernate.jdbc.use_get_generated_keys", "false")
                    .addAnnotatedClass(Book.class);

            // Create SessionFactory
            sessionFactory = configuration.buildSessionFactory();
            // Create Repositories
            this.bookRepository = new BookRepository(this.sessionFactory);
        } catch (Throwable e) {
            System.out.println("Initial SessionFactory creation failed." + e);
            throw new ExceptionInInitializerError(e);
        }
    }

    public static DBHandler getInstance() {
        if (instance == null) {
            synchronized (DBHandler.class) {
                if (instance == null) {
                    instance = new DBHandler();
                }
            }
        }
        return instance;
    }
}
