package orbitaljin.codeus.store;

import orbitaljin.codeus.store.models.*;
import orbitaljin.codeus.store.models.Thread;
import orbitaljin.codeus.store.repositories.*;

import org.hibernate.cfg.Configuration;
import org.hibernate.SessionFactory;

// I Used the Singleton pattern to ensure that only one instance of the DBHandler is created
public class DBHandler {
    private SessionFactory sessionFactory;

    private final ThreadRepository threadRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final TagRepository tagRepository;
    private final BookmarkRepository bookmarkRepository;

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
                    .addAnnotatedClass(Comment.class)
                    .addAnnotatedClass(Tag.class)
                    .addAnnotatedClass(Bookmark.class)
                    .addAnnotatedClass(User.class);

            // Create SessionFactory
            sessionFactory = configuration.buildSessionFactory();
            // Create Repositories
            threadRepository = new ThreadRepository(sessionFactory);
            userRepository = new UserRepository(sessionFactory);
            commentRepository = new CommentRepository(sessionFactory);
            postRepository = new PostRepository(sessionFactory);
            tagRepository = new TagRepository(sessionFactory);
            bookmarkRepository = new BookmarkRepository(sessionFactory);
        } catch (Throwable e) {
            System.out.println("Initial SessionFactory creation failed." + e);
            throw new ExceptionInInitializerError(e);
        }
    }

    // Singleton pattern
    private static final class InstanceHolder {
        private static final DBHandler instance = new DBHandler();
    }

    public static DBHandler getInstance() {
        return InstanceHolder.instance;
    }

    public ThreadRepository getThreadRepository() {
        return threadRepository;
    }

    public UserRepository getUserRepository() {
        return userRepository;
    }

    public CommentRepository getCommentRepository() {
        return commentRepository;
    }

    public PostRepository getPostRepository() {
        return postRepository;
    }

    public TagRepository getTagRepository() {
        return tagRepository;
    }
}
