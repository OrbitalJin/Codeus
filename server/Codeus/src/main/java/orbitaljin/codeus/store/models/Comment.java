package orbitaljin.codeus.store.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "comments")
public class Comment extends Model {
    private String content;
    private String postId;
    private String authorId;

    public Comment() {
    }

    public Comment(
            String content,
            String postId,
            String authorId
    ) {
        this.content = content;
        this.postId = postId;
        this.authorId = authorId;
    }

    public Comment(
            String id,
            String content,
            String postId,
            String authorId
    ) {
        this.setId(id);
        this.content = content;
        this.postId = postId;
        this.authorId = authorId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getPostId() {
        return postId;
    }

    public void setPostId(String postId) {
        this.postId = postId;
    }

    public String getAuthorId() {
        return authorId;
    }

    public void setAuthorId(String authorId) {
        this.authorId = authorId;
    }

    public String toString() {
        return "Comment{" +
                "id=" + this.getId() +
                ", content='" + content + '\'' +
                ", postId=" + postId +
                ", authorId=" + authorId +
                ", createdAt=" + this.getCreatedAt() +
                '}';
    }
}
