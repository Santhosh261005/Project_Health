import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); // Redirect after successful login
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard"); // Redirect after successful Google login
    } catch (error) {
      console.error("Google Sign-In error:", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition duration-300"
        >
          <img src="https://img.icons8.com/color/24/000000/google-logo.png" alt="Google" />
          Sign in with Google
        </button>

        <p className="mt-4 text-center text-gray-600">
        Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

