package orbitaljin.codeus.store.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "bookmarks")
public class Bookmark extends Model {
    private Long userId;
    private Long postId;

    public Bookmark() {
    }

    public Bookmark(Long userId, Long postId) {
        this.userId = userId;
        this.postId = postId;
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

    public String toString() {
        return "Bookmark{" +
                "id=" + this.getId() +
                ", userId=" + userId +
                ", postId=" + postId +
                ", createdAt=" + this.getCreatedAt() +
                '}';
    }
}
