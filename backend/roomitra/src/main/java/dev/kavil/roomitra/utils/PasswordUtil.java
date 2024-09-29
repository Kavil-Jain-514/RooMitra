package dev.kavil.roomitra.utils;

import org.mindrot.jbcrypt.BCrypt;

public class PasswordUtil {

    // Hash the password using BCrypt
    public static String hashPassword(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }

    // Verify the password
    public static boolean verifyPassword(String password, String hashedPassword) {
        return BCrypt.checkpw(password, hashedPassword);
    }
}
