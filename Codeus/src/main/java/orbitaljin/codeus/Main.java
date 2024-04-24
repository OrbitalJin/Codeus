package orbitaljin.codeus;

import orbitaljin.codeus.api.APIController;
import orbitaljin.codeus.store.DBHandler;
import orbitaljin.codeus.store.models.Book;

import org.springframework.boot.SpringApplication;

public class Main {
    public static void main(String[] args) throws Exception {
        DBHandler.getInstance().bookRepository.create(
            new Book(
                    "The Great Gatsby",
                    "F. Scott Fitzgerald"
            ));
        System.out.println(
                DBHandler.getInstance().bookRepository.getAll()
        );
        SpringApplication.run(APIController.class, args);
    }
}