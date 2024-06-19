package orbitaljin.codeus.store.repositories;

import orbitaljin.codeus.store.models.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VoteRepository extends JpaRepository<Vote, String>{
    Vote findByUserIdAndPostId(String userId, String postId);
    void deleteByUserIdAndPostId(String userId, String postId);
    List<Vote> findByUserId(String userId);
    int countByPostIdAndValue(String postId, int value);
}
