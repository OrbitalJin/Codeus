package orbitaljin.codeus.store.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class ShareCodeLink {
    @Id
    private String shortLink;
    private int snippetId;

    public ShareCodeLink() {
    }

    public ShareCodeLink(
            String shortLink,
            int snippetId
    ) {
        this.shortLink = shortLink;
        this.snippetId = snippetId;
    }

    public void setShortLink(String shortLink) {
        this.shortLink = shortLink;
    }

    public String getShortLink() {
        return shortLink;
    }

    public int getSnippetId() {
        return snippetId;
    }

    public void setSnippetId(int snippetId) {
        this.snippetId = snippetId;
    }

    @Override
    public String toString() {
        return "ShareCodeLink{" +
                "shortLink='" + shortLink + '\'' +
                ", snippetId=" + snippetId +
                '}';
    }
}
