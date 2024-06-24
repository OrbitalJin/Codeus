package orbitaljin.codeus.store.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "threads")
public class Thread extends Model {
    private String title;
    private String description;
    private String language;
    private int postCount = 0;

    public Thread() {
    }

    public Thread(
            String title,
            String description
    ) {
        this.title = title;
        this.description = description;
    }

    public Thread(
            String id,
            String title,
            String description,
            String language
    ) {
        this.setId(id);
        this.title = title;
        this.description = description;
        this.language = language;
    }

    public int getPostCount() {
        return postCount;
    }

    public void setPostCount(int postCount) {
        this.postCount = postCount;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    @Override
    public String toString() {
        return "Thread{" +
                "id=" + this.getId() +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", postCount='" + postCount + '\'' +
                ", language='" + language + '\'' +
                '}';
    }
}
