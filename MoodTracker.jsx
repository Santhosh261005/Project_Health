import React, { useState } from "react";
import { db } from "../firebase/firebase"; // Ensure correct path
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const MoodTracker = () => {
  const [mood, setMood] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Ensure all fields are filled
    if (!mood || !notes || !date) {
      alert("Please enter mood, note, and date before submitting.");
      return;
    }

    try {
      // Save data to Firestore
      await addDoc(collection(db, "moods"), {
        mood,
        note: notes, // Ensure correct variable usage
        date,
        timestamp: serverTimestamp(), // Store Firestore-generated timestamp
      });

      alert("Mood entry added successfully!");

      // Reset form fields after submission
      setMood("");
      setNotes("");
      setDate("");
    } catch (error) {
      console.error("Error adding document:", error);
      alert("Error saving mood. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Mood Tracker</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Mood Selection */}
        <label className="block">
          <span className="text-gray-700">Select Your Mood:</span>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
          >
            <option value="">Choose mood</option>
            <option value="Happy">😊 Happy</option>
            <option value="Neutral">😐 Neutral</option>
            <option value="Sad">😢 Sad</option>
          </select>
        </label>

        {/* Notes Input */}
        <label className="block">
          <span className="text-gray-700">Notes:</span>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
            placeholder="Write something about your day..."
          ></textarea>
        </label>

        {/* Date Selection */}
        <label className="block">
          <span className="text-gray-700">Date:</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
          />
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Save Mood
        </button>
      </form>
    </div>
  );
};

export default MoodTracker;
