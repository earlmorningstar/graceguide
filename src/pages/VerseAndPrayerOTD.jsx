import { useState, useEffect } from "react";
import { bibleVerses, prayers } from "./VerseAndPrayerData";
import { useNavigate } from "react-router-dom";
import "./AllStyles.css";

function VerseAndPrayerOTD() {
  const [verse, setVerse] = useState("");
  const [prayer, setPrayer] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date();
    const dayOfYear = Math.floor(
      (today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
    );

    const verseIndex = dayOfYear % bibleVerses.length;
    const prayerIndex = dayOfYear % prayers.length;

    setVerse(bibleVerses[verseIndex]);
    setPrayer(prayers[prayerIndex]);
  }, []);

  const handleBackToHomeBtn = () => {
    navigate("/");
  };

  return (
    <section className="verse-prayer-container">
        <div className="homeBtn">
        <button onClick={handleBackToHomeBtn}>Home</button>
        </div>
      <div className="verse-prayer-contentHolder">
        <div>
          <h3>Devotional Verse:</h3>
          <span>{verse}</span>
        </div>
        <div>
          <h3>Petition:</h3>
          <span>{prayer}</span>
        </div>
      </div>
    </section>
  );
}

export default VerseAndPrayerOTD;
