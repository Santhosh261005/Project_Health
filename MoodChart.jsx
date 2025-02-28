import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const MoodChart = ({ moodData }) => {
  if (!moodData || moodData.length === 0) {
    return <p>No mood data available.</p>;
  }

  // Convert Firestore timestamps to readable dates
  const sortedData = moodData.sort((a, b) => a.timestamp - b.timestamp);
  const labels = sortedData.map((entry) =>
    new Date(entry.timestamp.toDate()).toLocaleDateString()
  );

  // Assign numerical values to moods for visualization
  const moodValues = sortedData.map((entry) => {
    if (entry.mood === "Happy") return 3;
    if (entry.mood === "Neutral") return 2;
    if (entry.mood === "Sad") return 1;
    return 0;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Mood Trend",
        data: moodValues,
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        fill: true,
        tension: 0.4, // Smooth curve
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          callback: (value) => {
            if (value === 3) return "😊 Happy";
            if (value === 2) return "😐 Neutral";
            if (value === 1) return "😢 Sad";
            return "";
          },
        },
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Mood Trend Analysis</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default MoodChart;
