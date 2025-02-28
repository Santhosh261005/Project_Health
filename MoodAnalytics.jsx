import React, { useEffect, useState } from "react";
import { db } from "/src/firebase/firebase"; // Ensure the correct path
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import MoodChart from "./MoodChart";

const MoodAnalytics = () => {
  const [moodData, setMoodData] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "moods"), orderBy("timestamp", "asc")); // Order by timestamp
      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMoodData(data);
      setStats(calculateMoodStats(data)); // Calculate stats after fetching data
    };

    fetchData();
  }, []);

  // Function to calculate mood statistics
  const calculateMoodStats = (moodData) => {
    const moodCounts = { Happy: 0, Neutral: 0, Sad: 0 };

    moodData.forEach((entry) => {
      moodCounts[entry.mood]++;
    });

    const totalEntries = moodData.length;
    const happyPercentage = ((moodCounts.Happy / totalEntries) * 100).toFixed(2);
    const sadPercentage = ((moodCounts.Sad / totalEntries) * 100).toFixed(2);
    const neutralPercentage = ((moodCounts.Neutral / totalEntries) * 100).toFixed(2);

    return { totalEntries, happyPercentage, sadPercentage, neutralPercentage };
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Mood Trends Over Time</h2>

      {/* Mood Chart */}
      <MoodChart moodData={moodData} />

      {/* Key Mood Statistics */}
      {stats && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Mood Insights</h3>
          <p>Total Mood Entries: {stats.totalEntries}</p>
          <p>😊 Happy Days: {stats.happyPercentage}%</p>
          <p>😐 Neutral Days: {stats.neutralPercentage}%</p>
          <p>😢 Sad Days: {stats.sadPercentage}%</p>
        </div>
      )}
    </div>
  );
};

export default MoodAnalytics;
