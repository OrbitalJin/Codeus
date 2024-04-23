package orbitaljin.codeus;

import orbitaljin.codeus.store.DBHandler;
import orbitaljin.codeus.store.models.Book;

public class Main {
    public static void main(String[] args) {
        DBHandler.getInstance().bookRepository.create(
            new Book(
                    "The Great Gatsby",
                    "F. Scott Fitzgerald"
            ));
        System.out.println(
                DBHandler.getInstance().bookRepository.getAll()
        );
    }
}