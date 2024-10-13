import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { BiArrowBack } from "react-icons/bi";
import "./AllStyles.css";

const BibleReader = () => {
  const [versions, setVersions] = useState([]);
  const [books, setBooks] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [chapterText, setChapterText] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [loadingChapters, setLoadingChapters] = useState(false);
  const [loadingChapterText, setLoadingChapterText] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const apiKey = "8b8e15ab30542ab6ae60737cc6482eed";

  // Moved particular bible version to the top of the select options
  const priorityVersionIds = [
    "de4e12af7f28f599-02",
    "06125adad2d5898a-01",
    "7142879509583d59-01",
    "9879dbb7cfe39e4d-01",
    "01b29f4b342acc35-01",
  ]; // Bible version actual IDs from the api

  useEffect(() => {
    fetch("https://api.scripture.api.bible/v1/bibles", {
      headers: { "api-key": apiKey },
    })
      .then((response) => response.json())
      .then((data) => {
        const sortedVersions = data.data.sort((a, b) => {
          const aPriority = priorityVersionIds.includes(a.id)
            ? priorityVersionIds.indexOf(a.id)
            : Infinity;
          const bPriority = priorityVersionIds.includes(b.id)
            ? priorityVersionIds.indexOf(b.id)
            : Infinity;
          return aPriority - bPriority;
        });
        setVersions(sortedVersions);
      })
      .finally(() => setLoading(false))
      .catch((error) => {
        console.error(error);
        setError(
          "Oops! Something went wrong. The issue might be on our end, so please don't be discouraged. Make sure your internet connection is active, and try refreshing the page or come back later. Rest assured, we're working swiftly to restore this page for you as soon as possible. Thank you for your patience."
        );
      });
  }, []);

  const fetchBooks = (bibleId) => {
    setLoadingBooks(true);
    fetch(`https://api.scripture.api.bible/v1/bibles/${bibleId}/books`, {
      headers: { "api-key": apiKey },
    })
      .then((response) => response.json())
      .then((data) => {
        setBooks(data.data);
        setSelectedBook("");
        setChapters([]);
        setChapterText("");
      })
      .finally(() => setLoadingBooks(false))
      .catch((error) => {
        console.error(error);
        setError(
          "Oops! Something went wrong. The issue might be on our end, so please don't be discouraged. Make sure your internet connection is active, and try refreshing the page or come back later. Rest assured, we're working swiftly to restore this page for you as soon as possible. Thank you for your patience."
        );
      });
  };

  const fetchChapters = (bibleId, bookId) => {
    setLoadingChapters(true);
    fetch(
      `https://api.scripture.api.bible/v1/bibles/${bibleId}/books/${bookId}/chapters`,
      {
        headers: { "api-key": apiKey },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setChapters(data.data);
        setSelectedChapter("");
        setChapterText("");
      })
      .finally(() => setLoadingChapters(false))
      .catch((error) => {
        console.error(error);
        setError(
          "Oops! Something went wrong. The issue might be on our end, so please don't be discouraged. Make sure your internet connection is active, and try refreshing the page or come back later. Rest assured, we're working swiftly to restore this page for you as soon as possible. Thank you for your patience."
        );
      });
  };

  const fetchChapterText = (bibleId, chapterId) => {
    setLoadingChapterText(true);
    fetch(
      `https://api.scripture.api.bible/v1/bibles/${bibleId}/chapters/${chapterId}`,
      {
        headers: { "api-key": apiKey },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data.data.content, "text/html");
        const verses = Array.from(doc.querySelectorAll(".p span.v")).map(
          (span) =>
            `${span.textContent}. ${span.nextSibling.textContent.trim()}`
        );
        setChapterText(verses.join(" "));
      })
      .finally(() => setLoadingChapterText(false))
      .catch((error) => {
        console.error(error);
        setError(
          "Oops! Something went wrong. The issue might be on our end, so please don't be discouraged. Make sure your internet connection is active, and try refreshing the page or come back later. Rest assured, we're working swiftly to restore this page for you as soon as possible. Thank you for your patience."
        );
      });
  };

  const handleBackToHomeBtn = () => {
    navigate("/");
  };

  const handlePrevChapter = () => {
    const currentIndex = chapters.findIndex(
      (chapter) => chapter.id === selectedChapter
    );
    if (currentIndex > 0) {
      const prevChapterId = chapters[currentIndex - 1].id;
      setSelectedChapter(prevChapterId);
      fetchChapterText(selectedVersion, prevChapterId);
    }
  };

  const handleNextChapter = () => {
    const currentIndex = chapters.findIndex(
      (chapter) => chapter.id === selectedChapter
    );
    if (currentIndex < chapters.length - 1) {
      const nextChapterId = chapters[currentIndex + 1].id;
      setSelectedChapter(nextChapterId);
      fetchChapterText(selectedVersion, nextChapterId);
    }
  };

  return (
    <div className="bible-parent" id="readerFullBk">
      <NavLink to="/bible">
        <span>
          <BiArrowBack color="#c9ce8c" size={40} />
        </span>
      </NavLink>
      <button onClick={handleBackToHomeBtn}>Home</button>

      {loading && (
        <div className="loader" id="loader-id">
          <ClipLoader size={60} color={"#c9ce8c"} speedMultiplier={1} />
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
      {!loading && !error && (
        <div className="bible-holder">
          <div className="selection-label">
            <h2>Select a Bible Version</h2>
            <select
              className="select-width"
              onChange={(e) => {
                setSelectedVersion(e.target.value);
                fetchBooks(e.target.value);
              }}
              value={selectedVersion}
            >
              <option value="">Select Version</option>
              {versions.map((version) => (
                <option key={version.id} value={version.id}>
                  {version.name}
                </option>
              ))}
            </select>
            {loadingBooks && (
              <div className="reader-s-loader">
                <ClipLoader size={15} color={"#c9ce8c"} speedMultiplier={1} />
              </div>
            )}
          </div>

          <div className="selection-label">
            <h2>Select a Book</h2>
            <select
              className="select-width"
              onChange={(e) => {
                setSelectedBook(e.target.value);
                fetchChapters(selectedVersion, e.target.value);
              }}
              disabled={!selectedVersion}
              value={selectedBook}
            >
              <option value="">Select Book</option>
              {books.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.name}
                </option>
              ))}
            </select>
            {loadingChapters && (
              <div className="reader-s-loader">
                <ClipLoader size={15} color={"#c9ce8c"} speedMultiplier={1} />
              </div>
            )}
          </div>

          <div className="selection-label">
            <h2>Select a Chapter</h2>
            <select
              className="select-width"
              onChange={(e) => {
                setSelectedChapter(e.target.value);
                fetchChapterText(selectedVersion, e.target.value);
              }}
              disabled={!selectedBook}
              value={selectedChapter}
            >
              <option value="">Select Chapter</option>
              {chapters.map((chapter) => (
                <option key={chapter.id} value={chapter.id}>
                  {chapter.reference}
                </option>
              ))}
            </select>
          </div>

          <div className="chapter-header-text">
            <h2>
              {selectedChapter && selectedChapter.includes(":")
                ? selectedChapter.split(":")[1]
                : selectedChapter}
            </h2>
            {loadingChapterText ? (
              <div className="loader">
                <ClipLoader size={40} color={"#c9ce8c"} speedMultiplier={1} />
              </div>
            ) : (
              <span>{chapterText}</span>
            )}
            <div
              className="ourJourney-discoveryHolder"
              id="nextPrevious-buttons"
            >
              <button onClick={handlePrevChapter} disabled={!chapterText}>
                Prev Chapter
              </button>
              <button onClick={handleNextChapter} disabled={!chapterText}>
                Next Chapter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BibleReader;
