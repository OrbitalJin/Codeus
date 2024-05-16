package orbitaljin.codeus.store.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "tags")
public class Tag extends Model {
    private String name;
    private String color;

    public Tag() {

    }

    public Tag(String name, String color) {
        this.name = name;
        this.color = color;
    }

    public Tag(Long id, String name, String color) {
        this.setId(id);
        this.name = name;
        this.color = color;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    @Override
    public String toString() {
        return "Tag{" +
                "id=" + this.getId() +
                ", name='" + name + '\'' +
                ", color='" + color + '\'' +
                '}';
    }
}
