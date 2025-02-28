import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div 
      className="h-screen flex items-center justify-center bg-cover bg-center relative" 
      style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?nature,calm')" }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-md z-10">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to Mental Health App</h1>
        <p className="mt-3 text-gray-600 text-lg">
          Track your mood, connect with the community, and improve your mental well-being.
        </p>

        <div className="mt-6 flex justify-center space-x-4">
          <Link to="/login">
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;



