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
    private PostType postType;
    private int threadId;

    public Post() {
    }

    public Post(
            Long userId,
            String title,
            String content,
            PostType postType
    ) {
        this.userId = userId;
        this.title = title;
        this.content = content;
        this.postType = postType;
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

    public PostType getPostType() {
        return postType;
    }

    public void setPostType(PostType postType) {
        this.postType = postType;
    }

    @Override
    public String toString() {
        return "Post{" +
                "id=" + this.getId() +
                ", userId=" + userId +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", postType=" + postType +
                '}';
    }
}
