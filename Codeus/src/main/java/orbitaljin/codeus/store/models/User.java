package orbitaljin.codeus.store.models;

import jakarta.persistence.Entity;

import java.sql.Date;

@Entity
public class User extends Model {
    private String username;
    private String password;
    private Date registeredAt;

    public User() {
    }

    public User(
            String username,
            String password,
            Date registeredAt
    ) {
        this.username = username;
        this.password = password;
        this.registeredAt = registeredAt;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getRegisteredAt() {
        return registeredAt;
    }

    public void setRegisteredAt(Date registeredAt) {
        this.registeredAt = registeredAt;
    }

    public String toString() {
        return "User{" +
                "id=" + this.getId() +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", registeredAt=" + registeredAt +
                '}';
    }
}
