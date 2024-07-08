import "./AllStyles.css";
import { IoHeartOutline } from "react-icons/io5";
import { BiArrowBack } from "react-icons/bi";
import { ClipLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { fetchVerseOfTheDay } from "./api";

function Blog() {
  const [verse, setVerse] = useState(null);
  const [prevVerse, setPrevVerse] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const getYesterdayDate = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return formatDate(date);
  };

  useEffect(() => {
    const getVerse = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchVerseOfTheDay();
        const storedVerse = JSON.parse(localStorage.getItem("currentVerse"));

        if (storedVerse && storedVerse.text !== data.text) {
          localStorage.setItem("previousVerse", JSON.stringify(storedVerse));
          setPrevVerse(storedVerse);
        } else {
          setPrevVerse(JSON.parse(localStorage.getItem("previousVerse")));
        }

        localStorage.setItem("currentVerse", JSON.stringify(data));
        setVerse(data);
      } catch (err) {
        setError(
          "Oops! Something went wrong. The issue might be on our end, so please don't be discouraged. Make sure your internet connection is active, and try refreshing the page or come back later. Rest assured, we're working swiftly to restore the \"Verse of the Day\" for you as soon as possible. Thank you for your patience."
        );
      } finally {
        setLoading(false);
      }
    };
    getVerse();
  }, []);

  const handleVerseClick = () => {
    navigate("/blog-detail", { state: { verse } });
  };

  const todayDate = formatDate(new Date());
  const yesterdayDate = getYesterdayDate();

  return (
    <div className="blogPage-parent">
      <NavLink to="/">
        <span>
          <BiArrowBack color="#c9ce8c" size={40} />
        </span>
      </NavLink>
      <div className="blogPage-content-holder">
        {loading ? (
          <div className="loader-verse">
            <ClipLoader
              size={60}
              color={"#c9ce8c"}
              loading={loading}
              speedMultiplier={1}
            />
          </div>
        ) : (
          <div className="blogPage-text-acct">
            {error && (
              <p className="votd-error" style={{ color: "#c9ce8c" }}>
                {error}
              </p>
            )}
            {verse && (
              <div style={{ cursor: "pointer" }} className="blogPage-info-menu">
                <div className="blogPage-text">
                  <h2>Verse Of The Day:</h2>
                  <div className="verseHover">
                    <span>{verse.text}</span>
                    <span>
                      {verse.bookname} {verse.chapter}:{verse.verse}
                    </span>
                    <span>Bible Version: {verse.version}</span>
                  </div>
                  <button className="exegesis-btn" onClick={handleVerseClick}>
                    Full Exegesis Here:
                  </button>
                </div>
                <div className="heart-icon">
                  <IoHeartOutline />
                </div>
              </div>
            )}
            <span>{todayDate}.</span>
          </div>
        )}
      </div>
      {!loading && (
        <div className="blogPage-content-holder" id="previousVotd-id">
          <div className="blogPage-text-acct">
            {prevVerse && (
              <div style={{ cursor: "pointer" }} className="blogPage-info-menu">
                <div className="blogPage-text">
                  <h2>Previous Verse Of The Day:</h2>
                  <span>{prevVerse.text}</span>
                  <span>
                    {prevVerse.bookname} {prevVerse.chapter}:{prevVerse.verse}
                  </span>
                  <span>Bible Version: {prevVerse.version}</span>
                </div>
                <div className="heart-icon">
                  <IoHeartOutline />
                </div>
              </div>
            )}
            <span>{yesterdayDate}.</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Blog;