package orbitaljin.codeus.store.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.sql.Date;

@Entity
@Table(name = "posts")
public class Post extends Model{
    public enum PostType {
        QUESTION,
        SNIPPET,
    }
    private Long userId;
    private String title;
    private String content;
    private String language;
    private Long threadId;
    private String description;

    public Post() {
    }

    public Post(
            Long userId,
            String title,
            String content,
            String description,
            String language
    ) {
        this.userId = userId;
        this.title = title;
        this.content = content;
        this.description = description;
        this.language = language;
    }

    public Post (
            Long userId,
            String title,
            String content,
            String language,
            String description,
            Long threadId
    ) {
        this.userId = userId;
        this.threadId = threadId;
        this.title = title;
        this.content = content;
        this.description = description;
        this.language = language;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getThreadId() {
        return threadId;
    }

    public void setThreadId(Long threadId) {
        this.threadId = threadId;
    }

    public String getLanguage() {
        return this.language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }



    @Override
    public String toString() {
        return "Post{" +
                "id=" + this.getId() +
                ", userId=" + userId +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                '}';
    }
}
