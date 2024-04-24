package orbitaljin.codeus.store.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.sql.Date;

@Entity
public class Post {
    public enum PostType {
        QUESTION,
        SNIPPET,
    }
    @Id
    @GeneratedValue
    private Long id;
    private Long userId;
    private String title;
    private String content;
    private PostType postType;
    private int tagId;

    private int threadId;

    private Date createdAt;

    private int upVoteCount;

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

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
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
                "id=" + id +
                ", userId=" + userId +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", postType=" + postType +
                '}';
    }
}
