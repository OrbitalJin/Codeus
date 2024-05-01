package orbitaljin.codeus.store.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class UpVote extends Model {
    private Long userId;
    private Long postId;

    public UpVote() {
    }

    public UpVote(
            Long userId,
            Long postId
    ) {
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

    @Override
    public String toString() {
        return "UpVote{" +
                "id=" + this.getId() +
                ", userId=" + userId +
                ", postId=" + postId +
                '}';
    }
}
