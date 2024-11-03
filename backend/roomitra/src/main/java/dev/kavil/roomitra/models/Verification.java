package dev.kavil.roomitra.models;

import java.util.Date;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "verification")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Verification {
    @Id
    private ObjectId id;
    private ObjectId userId;

    public enum VerificationStatus {
        PENDING, VERIFIED, REJECTED
    }

    private VerificationStatus verificationStatus;

    public enum VerificationType {
        STUDENT_EMAIL, COMPANY_EMAIL, DOCUMENT
    }

    private VerificationType verificationType; // Tracks how the verification was performed (email or document)

    private String documentProof; // Optional: for document-based verification
    private String emailVerified; // Stores the verified email address

    @CreatedDate
    private Date createdAt;
}
