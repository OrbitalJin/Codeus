package orbitaljin.codeus.api.routers;

import org.springframework.http.ResponseEntity;

public interface Router<T> {
    public ResponseEntity<?> getAll();
    public ResponseEntity<?> get(Long id);
    public ResponseEntity<?> create(T entity);
    public ResponseEntity<?> delete(T entity);
    public ResponseEntity<?> update(T entity);
    public ResponseEntity<?> search(String query);

}
