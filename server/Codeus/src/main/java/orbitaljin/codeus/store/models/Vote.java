package orbitaljin.codeus.store.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "votes")
public class Vote extends Model{
    public String userId;
    public String postId;
    public int value = 1;

    public Vote() {
    }

    public Vote(String userId, String postId, int value) {
        this.userId = userId;
        this.postId = postId;
        this.value = value;
    }

    public Vote(String userId, String postId) {
        this.userId = userId;
        this.postId = postId;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
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

    @Override
    public String toString() {
        return "Vote{" +
                "userId='" + userId + '\'' +
                ", value='" + value + "'" +
                ", postId='" + postId + '\'' +
                '}';
    }
}




