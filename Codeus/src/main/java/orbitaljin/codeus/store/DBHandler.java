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
    public CommentRepository commentRepository;
    public PostRepository postRepository;
    public ShareCodeLinkRepository shareCodeLinkRepository;
    public TagRepository tagRepository;
    public ThreadRepository threadRepository;
    public UpvoteRepository upvoteRepository;
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
                    .addAnnotatedClass(Comment.class)
                    .addAnnotatedClass(ShareCodeLink.class)
                    .addAnnotatedClass(Post.class)
                    .addAnnotatedClass(Tag.class)
                    .addAnnotatedClass(Thread.class)
                    .addAnnotatedClass(UpVote.class)
                    .addAnnotatedClass(User.class);

            // Create SessionFactory
            sessionFactory = configuration.buildSessionFactory();
            // Create Repositories
            commentRepository = new CommentRepository(sessionFactory);
            postRepository = new PostRepository(sessionFactory);
            shareCodeLinkRepository = new ShareCodeLinkRepository(sessionFactory);
            tagRepository = new TagRepository(sessionFactory);
            threadRepository = new ThreadRepository(sessionFactory);
            upvoteRepository = new UpvoteRepository(sessionFactory);
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
