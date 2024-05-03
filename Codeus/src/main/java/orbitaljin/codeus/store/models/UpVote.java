package orbitaljin.codeus.store.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "up_votes")
public class UpVote  {

    @Id
    @GeneratedValue
    private Long id;

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

    @Override
    public String toString() {
        return "UpVote{" +
                "id=" + this.id +
                ", userId=" + userId +
                ", postId=" + postId +
                '}';
    }
}
