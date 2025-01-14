import axios from "axios";

export async function saveUserToBackend(session) {
  console.log("Sending user data to backend:", session); // Log the session data
  try {
    const response = await axios.post("http://localhost:5000/save-user", {
      googleId: session.user.id, // Replace with session.user.sub if Firebase Auth
      username: session.user.name,
      email: session.user.email,
    });
    console.log("Response from backend:", response.data.message);
  } catch (error) {
    console.error("Error saving user to backend:", error.response || error);
  }
}
