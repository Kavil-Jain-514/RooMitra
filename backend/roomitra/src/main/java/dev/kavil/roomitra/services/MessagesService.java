package dev.kavil.roomitra.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import dev.kavil.roomitra.models.Messages;
import dev.kavil.roomitra.repository.MessagesRepository;
import java.util.Date;
import java.util.List;

@Service
public class MessagesService {
    @Autowired
    private MessagesRepository messagesRepository;

    public Messages sendMessage(Messages message) {
        message.setSentAt(new Date());
        return messagesRepository.save(message);
    }

    public List<Messages> getConversation(String userId1, String userId2) {
        return messagesRepository.findBySenderIdAndRecipientIdOrRecipientIdAndSenderIdOrderBySentAtDesc(
                userId1, userId2, userId2, userId1);
    }

    public void markAsRead(String messageId) {
        Messages message = messagesRepository.findById(messageId)
                .orElseThrow(() -> new RuntimeException("Message not found"));
        message.setReadAt(new Date());
        messagesRepository.save(message);
    }
}