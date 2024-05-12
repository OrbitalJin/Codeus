package orbitaljin.codeus.store.repositories;

import java.util.List;
import java.util.Objects;

public interface Repository<T> {
    public T create(T entity);
    public T delete(Long id);
    public T update(T entity);
    public List<T> findByField(String field, Object value);
    public T findById(Long id);
    public List<T> findAll();
    public List<T> search(String field, String query);
    public boolean exists(T entity);
}
