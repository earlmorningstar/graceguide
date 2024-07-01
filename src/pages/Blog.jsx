import "./AllStyles.css";
import { SlOptionsVertical } from "react-icons/sl";
import { IoHeartOutline } from "react-icons/io5";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchVerseOfTheDay } from "./api";

function Blog() {
  const [verse, setVerse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getVerse = async () => {
      const data = await fetchVerseOfTheDay();
      setVerse(data);
    };
    getVerse();
  }, []);

  const handleVerseClick = () => {
    navigate("/blog-detail", { state: { verse } });
  };

  return (
    <div className="blogPage-parent">
      <span>Back Button</span>
      <div className="blogPage-content-holder">
        <div className="votd-image-container">
          <img src="/images/votdSample.jpg" alt="votd img" />
        </div>

        <div className="blogPage-text-acct">
          <div className="blogPage-acct-menu">
            <span>
              <p>forpractice JavaScript</p>
              <p>6 days ago * 2 min</p>
            </span>
            <SlOptionsVertical />
          </div>
          {verse && (
            <div onClick={handleVerseClick} style={{ cursor: 'pointer' }} className="blogPage-info-menu">
              <div className="blogPage-text">
                <h2>Verse Of The Day:</h2>
                <span>
                {verse.text}
                </span>
                <span>{verse.bookname} {verse.chapter}:{verse.verse}</span>
              </div>
              <div className="heart-icon">
                <IoHeartOutline />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Blog;

