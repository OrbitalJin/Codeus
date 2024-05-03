package orbitaljin.codeus.store.models;

import jakarta.persistence.*;

@Entity(name = "comments")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private Long postId;
    private String content;

    public Comment() {
    }

    public Comment(
            Long userId,
            Long postId,
            String content
    ) {
        this.userId = userId;
        this.postId = postId;
        this.content = content;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public String toString() {
        return "Comment{" +
                "id=" + this.id +
                ", userId=" + userId +
                ", postId=" + postId +
                ", content='" + content + '\'' +
                '}';
    }
}
