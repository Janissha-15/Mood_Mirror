import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import "./Charts.css";

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const BACKEND_URL =
  "https://0a8027a8-5101-4ea7-a058-14df90716a40-00-blwls7y3w3ni.pike.replit.dev";

const Charts = () => {
  const [moodCounts, setMoodCounts] = useState({});
  const [mostFrequentMood, setMostFrequentMood] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMoodHistory = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/journal`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const moods = res.data.map((entry) => entry.mood);

        const counts = moods.reduce((acc, mood) => {
          if (mood && mood !== "Neutral") {
            acc[mood] = (acc[mood] || 0) + 1;
          }
          return acc;
        }, {});

        setMoodCounts(counts);

        // Find most frequent mood
        const mostFrequent = Object.entries(counts).reduce(
          (max, curr) => (curr[1] > max[1] ? curr : max),
          ["", 0],
        );
        setMostFrequentMood(mostFrequent[0]);
      } catch (error) {
        console.error("Failed to fetch moods:", error);
      }
    };

    fetchMoodHistory();
  }, [token]);

  const getMoodMessage = () => {
    switch (mostFrequentMood) {
      case "Happy":
        return "😊 You're glowing with happiness! Keep a gratitude journal 📝, spread smiles, and enjoy nature walks 🌿 to sustain this joy.";
      case "Sad":
        return "😔 Feeling low? Try writing out your thoughts ✍️, listening to soothing music 🎧, or taking a gentle walk 🚶‍♀️. You’re not alone.";
      case "Angry":
        return "😡 Anger is natural. Cool down with deep breathing 🧘, try a quick workout 🏋️, or write down what triggered you to understand it better.";
      case "Excited":
        return "🤩 Excitement is amazing! Channel that energy into creative hobbies 🎨, goal setting 🎯, or dancing to your favorite tunes 💃.";
      case "Love":
        return "❤️ Love is powerful! Share appreciation with someone you care about 💌, reflect on your connections 🪞, or write a note of gratitude 💖.";
      case "Anxious":
        return "😰 Anxiety can feel overwhelming. Try the 5-4-3-2-1 grounding technique 🌸, short meditations 🧘‍♂️, or limit screen time 📵 before bed.";
      default:
        return "";
    }
  };

  const data = {
    labels: Object.keys(moodCounts),
    datasets: [
      {
        label: "Mood Frequency",
        data: Object.values(moodCounts),
        backgroundColor: [
          "#4caf50", // Happy
          "#f44336", // Angry
          "#2196f3", // Sad
          "#ff9800", // Excited
          "#9c27b0", // Love
          "#607d8b", // Anxious
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Mood History Chart" },
    },
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <h1 className="charts-heading">Mood Insights Overview</h1>

      <div className="chart-container">
        {/* Added illustration at top-left */}
        <img
          src="https://illustrations.popsy.co/pink/keynote-presentation.svg"
          alt="Keynote Presentation Illustration"
          className="chart-illustration"
        />

        <div className="button-group">
          <button className="btn btn-Logout" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {Object.keys(moodCounts).length > 0 ? (
          <Bar data={data} options={options} />
        ) : (
          <p>No mood data to display yet.</p>
        )}
      </div>

      {/* Mood tips heading below the chart container */}
      <h2 className="mood-heading">Care Tips for Your Mood</h2>

      {mostFrequentMood && (
        <div className="mood-message">
          <p>{getMoodMessage()}</p>
        </div>
      )}
    </div>
  );
};

export default Charts;
