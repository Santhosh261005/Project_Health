import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        <Navbar /> {/* ✅ Ensure Navbar is placed here */}
        <AppRoutes />
      </div>
    </AuthProvider>
  );
}

export default App;
