package orbitaljin.codeus.store.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class ShareCodeLink {
    @Id
    private String shortLink;
    private long snippetId;

    public ShareCodeLink() {
    }

    public ShareCodeLink(
            String shortLink,
            long snippetId
    ) {
        this.shortLink = shortLink;
        this.snippetId = snippetId;
    }

    public void setId(long shortLink) {
        this.snippetId = shortLink;
    }

    public long getId() {
        return snippetId;
    }

    public void setShortLink(String shortLink) {
        this.shortLink = shortLink;
    }

    public String getShortLink() {
        return shortLink;
    }

    @Override
    public String toString() {
        return "ShareCodeLink{" +
                "shortLink='" + shortLink + '\'' +
                ", snippetId=" + snippetId +
                '}';
    }
}
