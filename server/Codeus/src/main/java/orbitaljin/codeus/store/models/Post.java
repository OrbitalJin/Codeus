package orbitaljin.codeus.store.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.sql.Date;

@Entity
@Table(name = "posts")
public class Post extends Model{

    private String threadId;
    private String authorId;
    private String title;
    private String content;
    private String language;
    private String theme;
    private String description;
    private Long voteCount = 0L;

    public Post() {
    }

    public Post(
            String authorId,
            String title,
            String content,
            String description,
            String language
    ) {
        this.authorId= authorId;
        this.title = title;
        this.content = content;
        this.description = description;
        this.language = language;
    }

    public Post (
            String authorId,
            String title,
            String content,
            String language,
            String description,
            String threadId
    ) {
        this.authorId = authorId;
        this.threadId = threadId;
        this.title = title;
        this.content = content;
        this.description = description;
        this.language = language;
    }

    public Long getVoteCount() {
        return this.voteCount;
    }

    public void setVoteCount(Long voteCount) {
        this.voteCount = voteCount;
    }

    public String getTheme() {
        return this.theme;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

    public String getAuthorId() {
        return authorId;
    }

    public void setAuthorId(String authorId) {
        this.authorId = authorId;
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

    public String getThreadId() {
        return threadId;
    }

    public void setThreadId(String threadId) {
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
                ", authorId=" + authorId +
                ", title='" + title + '\'' +
                ", threadId='" + threadId + '\'' +
                ", language='" + language + '\'' +
                ", description='" + description + '\'' +
                ", content='" + content + '\'' +
                ", voteCount='" + voteCount + '\'' +
                '}';
    }
}
