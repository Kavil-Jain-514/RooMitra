// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Service;
// import java.util.Optional;

// @Service
// public class AuthService {
// @Autowired
// private UserRepository userRepository;
// @Autowired
// private PasswordEncoder passwordEncoder;
// @Autowired
// private JwtUtil jwtUtil;

// public String registerUser(RegisterRequest request) {
// if (userRepository.existsByEmail(request.getEmail())) {
// throw new RuntimeException("Email already in use");
// }
// User user = new User();
// user.setName(request.getName());
// user.setEmail(request.getEmail());
// user.setPassword(passwordEncoder.encode(request.getPassword()));
// user.setUserType(request.getUserType());
// user.setPhoneNumber(request.getPhoneNumber());
// userRepository.save(user);
// return jwtUtil.generateToken(user.getEmail());
// }

// public String loginUser(AuthRequest request) {
// Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
// if (userOpt.isPresent() && passwordEncoder.matches(request.getPassword(),
// userOpt.get().getPassword())) {
// return jwtUtil.generateToken(userOpt.get().getEmail());
// }
// throw new RuntimeException("Invalid email or password");
// }
// }
