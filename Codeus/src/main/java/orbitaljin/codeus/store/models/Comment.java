package orbitaljin.codeus.store.models;

import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Comment extends Model {
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
                "id=" + this.getId() +
                ", userId=" + userId +
                ", postId=" + postId +
                ", content='" + content + '\'' +
                '}';
    }
}
