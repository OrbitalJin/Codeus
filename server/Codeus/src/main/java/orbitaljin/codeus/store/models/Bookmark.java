package orbitaljin.codeus.store.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "bookmarks")
public class Bookmark extends Model {
    private String userId;
    private String postId;

    public Bookmark() {
    }

    public Bookmark(String userId, String postId) {
        this.userId = userId;
        this.postId = postId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPostId() {
        return postId;
    }

    public void setPostId(String postId) {
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
