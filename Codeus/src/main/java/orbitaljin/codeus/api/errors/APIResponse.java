package orbitaljin.codeus.api.errors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

public class APIResponse<T>{
    private HttpStatus status;
    private Map<String, Object> payload;
    private String message;
    private T data;

    public APIResponse(HttpStatus status, String message, T data) {
        this.message = message;
        this.status = status;
        this.data = data;
        this.payload = new HashMap<String, Object>(){{
            put("statusCode", status.value());
            put("message", message);
            put("data", data);
        }};
    }

    public APIResponse(HttpStatus status, T data) {
        this.status = status;
        this.data = data;
        this.payload = new HashMap<String, Object>(){{
            put("statusCode", status.value());
            put("data", data);
        }};
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage() {
        this.message = message;
    }

    public T getData() {
        return this.data;
    }

    public void setData(T data) {
        this.data = data;
        this.payload.put("data", data);
    }

    public HttpStatus getStatus() { return this.status; }

    public void setStatus(HttpStatus status) {
        this.status = status;
        this.payload.put("statusCode", status.value());
    }

    public Map<String, Object> getPayload() {
        return this.payload;
    }

    public ResponseEntity<?> toReponseEntity() {
        return new ResponseEntity<>(
                this.payload,
                this.status
        );
    }
}
