package orbitaljin.codeus.store.repositories;

import java.util.List;

public interface Repository<T> {
    public T create(T entity);
    public void delete(T entity);
    public void update(T entity);
    public T findById(Long id);
    public List<T> findAll();
    // public List<T> fuzzySearch(String query);
    // public boolean exists(String label);
}
