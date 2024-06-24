package orbitaljin.codeus.store.services;

import orbitaljin.codeus.store.models.Post;
import orbitaljin.codeus.store.models.Thread;
import orbitaljin.codeus.store.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private ThreadService threadService;

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post getPostById(String id) {
        return postRepository.findById(id).orElse(null);
    }

    public List<Post> getPostsByThreadId(String threadId) {
        return postRepository.findByThreadId(threadId);
    }

    public Post createPost(Post post) {
        // if the post is associated with a thread, increment the post count of the thread
        if (post.getThreadId() != null) {
            Thread thread = threadService.getThreadById(post.getThreadId());
            if (thread != null) {
                thread.setPostCount(thread.getPostCount() + 1);
                threadService.updateThread(thread);
            }
        }
        return postRepository.save(post);
    }

    public Post updatePost(Post post) {
        return postRepository.save(post);
    }

    public void deletePost(String id) {
        // if the post is associated with a thread, decrement the post count of the thread
        Post post = postRepository.findById(id).orElse(null);
        if (post == null) return;
        if (post.getThreadId() != null) {
            Thread thread = threadService.getThreadById(post.getThreadId());
            if (thread != null) {
                thread.setPostCount(thread.getPostCount() - 1);
                threadService.updateThread(thread);
            }
        }
        postRepository.deleteById(id);
    }

    public List<Post> searchByTitle(String title) {
        return postRepository.findByTitleContaining(title);
    }

    public List<Post> searchByAuthorId(String authorId) {
        return postRepository.findByAuthorId(authorId);
    }
}
