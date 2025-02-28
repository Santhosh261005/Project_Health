import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase"; // ✅ Ensure correct path
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";
import { Line } from "react-chartjs-2";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase"; // Ensure correct path


// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const MoodHistory = () => {
  const [moodData, setMoodData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoodHistory = async () => {
      if (!auth.currentUser) return; // ✅ Prevents query if user is not logged in
      
      const q = query(
        collection(db, "mood_entries"),
        where("userId", "==", auth.currentUser.uid),
        orderBy("date", "asc")
      );

      try {
        const snapshot = await getDocs(q);
        setMoodData(snapshot.docs.map(doc => doc.data()));
      } catch (error) {
        console.error("Error fetching mood history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoodHistory();
  }, [auth.currentUser]); // ✅ Depend on `auth.currentUser` so it updates properly

  if (loading) return <p className="text-center mt-4">Loading mood data...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-center">Mood Trends</h2>
      {moodData.length > 0 ? (
        <Line
          data={{
            labels: moodData.map(entry => entry.date),
            datasets: [{
              label: "Mood Score",
              data: moodData.map(entry => (entry.mood === "happy" ? 3 : entry.mood === "neutral" ? 2 : 1)),
              borderColor: "blue",
              fill: false
            }]
          }}
        />
      ) : (
        <p className="text-center mt-4">No mood data available</p>
      )}
    </div>
  );
};

export default MoodHistory;

