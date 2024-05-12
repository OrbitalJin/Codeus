package orbitaljin.codeus.store;

import orbitaljin.codeus.store.models.*;
import orbitaljin.codeus.store.models.Thread;
import orbitaljin.codeus.store.repositories.*;

import org.hibernate.cfg.Configuration;
import org.hibernate.SessionFactory;

// I Used the Singleton pattern to ensure that only one instance of the DBHandler is created
public class DBHandler {
    private static DBHandler instance;
    private SessionFactory sessionFactory;
    public ThreadRepository threadRepository;
    public UserRepository userRepository;

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
                    .addAnnotatedClass(Post.class)
                    .addAnnotatedClass(Thread.class)
                    .addAnnotatedClass(User.class);

            // Create SessionFactory
            sessionFactory = configuration.buildSessionFactory();
            // Create Repositories
            threadRepository = new ThreadRepository(sessionFactory);
            userRepository = new UserRepository(sessionFactory);
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
