package orbitaljin.codeus.store.repositories;

import java.util.List;

public interface Repository<T> {
    public T create(T entity);
    public T delete(Long id);
    public T update(T entity);
    public T findById(Long id);
    public List<T> findAll();
    public List<T> search(String query);
    public boolean exists(T entity);
    public List<T> findByField(String field, String value);
}
