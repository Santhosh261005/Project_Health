import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { motion } from "framer-motion"; // ✅ Smooth animations

const TherapistList = () => {
  const [therapists, setTherapists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const snapshot = await getDocs(collection(db, "Therapist"));
        if (snapshot.empty) {
          console.warn("No therapists found in Firestore.");
        }
        setTherapists(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching therapists:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTherapists();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-200 to-indigo-300">
      <div className="max-w-4xl w-full p-6 bg-white bg-opacity-90 rounded-xl shadow-lg">
        <h2 className="text-4xl font-semibold text-center text-blue-700 mb-6">🌿 Find Your Therapist</h2>

        {loading ? (
          <p className="text-center text-lg font-medium text-gray-600 animate-pulse">
            Loading therapists...
          </p>
        ) : therapists.length > 0 ? (
          <div className="space-y-4">
            {therapists.map(therapist => (
              <motion.div 
                key={therapist.id} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }}
                className="p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-2xl hover:border-blue-400 transition-all"
              >
                <h3 className="font-bold text-2xl text-gray-800">{therapist.name}</h3>
                <p className="text-gray-600">🩺 Specialization: {therapist.specialization || "Not specified"}</p>
                <p className="text-gray-600">📅 Available: {Array.isArray(therapist.availability) ? therapist.availability.join(", ") : "No availability listed"}</p>
                <button className="mt-4 px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-all">
                  📞 Book Appointment
                </button>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No therapists available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default TherapistList;
