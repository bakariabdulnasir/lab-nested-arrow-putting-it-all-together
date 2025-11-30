// Outer function to create a login tracker
const createLoginTracker = (userInfo) => {
  // Initialize login tracking.
  let attemptCount = 0;

//define and return an arrow function
  return (passwordAttempt) => {
    // Increase attemptCount each time the function is called.
    attemptCount += 1;

    // Debugging: Log the current attempt count and password attempt for testing.
    console.log(`Attempt ${attemptCount}: Checking password attempt: "${passwordAttempt}"`);

    // Check if attemptCount exceeds 3. If so, lock the account and prevent further attempts.
    if (attemptCount > 3) {
      console.log("Account locked due to exceeding 3 attempts.");
      return "Account locked due to too many failed login attempts";
    }
    // If passwordAttempt matches userInfo.password and attemptCount is 3 or less, return success.
    else if (passwordAttempt === userInfo.password) {
      console.log("Login successful.");
      return "Login successful";
    }
    // If passwords do not match and attemptCount is 3 or less, return a message with the attempt number.
    else {
      console.log(`Login failed for attempt ${attemptCount}.`);
      return `Attempt ${attemptCount}: Login failed`;
    }
  };
};

// Example usage and testing (you can run this in Node.js to verify):
// Create a tracker for a user.
const loginAttempt = createLoginTracker({ username: "user1", password: "password123" });

// Test cases:
// 1. Failed attempt 1
console.log(loginAttempt("wrong1")); // Should output: Attempt 1: Login failed

// 2. Failed attempt 2
console.log(loginAttempt("wrong2")); // Should output: Attempt 2: Login failed

// 3. Failed attempt 3
console.log(loginAttempt("wrong3")); // Should output: Attempt 3: Login failed

// 4. Attempt after 3 failures (should lock, even if correct)
console.log(loginAttempt("password123")); // Should output: Account locked due to too many failed login attempts

// Reset for another test: Create a new tracker
const loginAttempt2 = createLoginTracker({ username: "user2", password: "pass456" });

// Successful login on attempt 2
console.log(loginAttempt2("wrong")); // Attempt 1: Login failed
console.log(loginAttempt2("pass456")); // Login successful

module.exports = {
  ...(typeof createLoginTracker !== 'undefined' && { createLoginTracker })
};