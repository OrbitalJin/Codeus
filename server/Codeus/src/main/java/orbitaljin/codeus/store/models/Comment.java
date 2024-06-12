package orbitaljin.codeus.store.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "comments")
public class Comment extends Model {
    private String content;
    private Long postId;
    private Long userId;
    private Long upvoteCount;

    public Comment() {
    }

    public Comment(
            String content,
            Long postId,
            Long userId,
            Long upvoteCount
    ) {
        this.content = content;
        this.postId = postId;
        this.userId = userId;
        this.upvoteCount = upvoteCount;
    }

    public Comment(
            String id,
            String content,
            Long postId,
            Long userId,
            Long upvoteCount
    ) {
        this.setId(id);
        this.content = content;
        this.postId = postId;
        this.userId = userId;
        this.upvoteCount = upvoteCount;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getUpvoteCount() {
        return upvoteCount;
    }

    public void setUpvoteCount(Long upvoteCount) {
        this.upvoteCount = upvoteCount;
    }

    public String toString() {
        return "Comment{" +
                "id=" + this.getId() +
                ", content='" + content + '\'' +
                ", postId=" + postId +
                ", userId=" + userId +
                ", upvoteCount=" + upvoteCount +
                ", createdAt=" + this.getCreatedAt() +
                '}';
    }
}
