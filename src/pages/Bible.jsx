import { useState, useEffect } from "react";
import { 
    // RingLoader, 
    ClipLoader } from "react-spinners";
import "./AllStyles.css";

function Bible() {
  const [bibles, setBibles] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState("");
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState("");
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState("");
  const [verses, setVerses] = useState([]);
  const [selectedVerse, setSelectedVerse] = useState("");
  const [verseText, setVerseText] = useState("");
  const [loading, setLoading] = useState(true);
  const [verseLoading, setVerseLoading] = useState(false);

  const handleSelectVersion = (versionId) => {
    setSelectedVersion(versionId);
    setBooks([]);
    setSelectedBook("");
    setChapters([]);
    setSelectedChapter("");
    setVerses([]);
    setSelectedVerse("");
    setVerseText("");
  };

  const handleSelectBook = (bookId) => {
    setSelectedBook(bookId);
    setChapters([]);
    setSelectedChapter("");
    setVerses([]);
    setSelectedVerse("");
    setVerseText("");
  };

  const handleSelectChapter = (chapterId) => {
    setSelectedChapter(chapterId);
    setVerses([]);
    setSelectedVerse("");
    setVerseText("");
  };

  const handleSelectVerse = (verseId) => {
    setSelectedVerse(verseId);
  };

  useEffect(() => {
    const fetchBibles = async () => {
      try {
        const response = await fetch(
          "https://api.scripture.api.bible/v1/bibles",
          {
            headers: { "api-key": "8b8e15ab30542ab6ae60737cc6482eed" },
          }
        );
        const data = await response.json();
        setBibles(data.data);
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching bibles:", error);
        setLoading(false);
      }
    };

    fetchBibles();
  }, []);

  useEffect(() => {
    if (selectedVersion) {
      const fetchBooks = async () => {
        try {
          const response = await fetch(
            `https://api.scripture.api.bible/v1/bibles/${selectedVersion}/books`,
            {
              headers: { "api-key": "8b8e15ab30542ab6ae60737cc6482eed" },
            }
          );
          const data = await response.json();
          setBooks(data.data);
        } catch (error) {
          console.error("Error fetching books:", error);
        }
      };

      fetchBooks();
    }
  }, [selectedVersion]);

  useEffect(() => {
    if (selectedBook) {
      const fetchChapters = async () => {
        try {
          const response = await fetch(
            `https://api.scripture.api.bible/v1/bibles/${selectedVersion}/books/${selectedBook}/chapters`,
            {
              headers: { "api-key": "8b8e15ab30542ab6ae60737cc6482eed" },
            }
          );
          const data = await response.json();
          setChapters(data.data);
        } catch (error) {
          console.error("Error fetching chapters:", error);
        }
      };

      fetchChapters();
    }
  }, [selectedBook, selectedVersion]);

  useEffect(() => {
    if (selectedChapter) {
      const fetchVerses = async () => {
        try {
          const response = await fetch(
            `https://api.scripture.api.bible/v1/bibles/${selectedVersion}/chapters/${selectedChapter}/verses`,
            {
              headers: { "api-key": "8b8e15ab30542ab6ae60737cc6482eed" },
            }
          );
          const data = await response.json();
          setVerses(data.data);
        } catch (error) {
          console.error("Error fetching verses:", error);
        }
      };

      fetchVerses();
    }
  }, [selectedChapter, selectedVersion]);

  useEffect(() => {
    if (selectedVerse) {
      setVerseLoading(true);
      const fetchVerseText = async () => {
        try {
          const response = await fetch(
            `https://api.scripture.api.bible/v1/bibles/${selectedVersion}/verses/${selectedVerse}`,
            {
              headers: { "api-key": "8b8e15ab30542ab6ae60737cc6482eed" },
            }
          );
          const data = await response.json();
          setTimeout(() => {
            setVerseText(data.data.content);
            setVerseLoading(false);
          }, 1000);
        } catch (error) {
          console.error("Error fetching verse text:", error);
          setVerseLoading(false);
        }
      };

      fetchVerseText();
    }
  }, [selectedVerse, selectedVersion]);

  const stripHtmlTagsAndVerseNumber = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    let text = tmp.textContent || tmp.innerText || "";
    text = text.replace(/^\d+\s*/, "");
    return text;
  };

  if (loading) {
    return (
      <div className="loader" id="loader-id">
        <ClipLoader size={60} color={"#c9ce8c"} loading={loading} speedMultiplier={1} />
      </div>
    );
  }

  return (
    <div className="bible-parent">
      <div className="bible-holder">
        <div className="selection-label">
          <h1>Select a Bible Version</h1>
          <select className="select-width" onChange={(e) => handleSelectVersion(e.target.value)}>
            <option value="">Select a Version</option>
            {bibles.map((bible) => (
              <option key={bible.id} value={bible.id}>
                {bible.name}
              </option>
            ))}
          </select>
        </div>

        <div className="selection-label">
          <h2>Select a Book</h2>
          <select
            value={selectedBook}
            onChange={(e) => handleSelectBook(e.target.value)}
            className="select-width"
            disabled={!selectedVersion}
          >
            <option value="">Select a Book</option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.name}
              </option>
            ))}
          </select>
        </div>

        <div className="selection-label">
          <h2>Select a Chapter</h2>
          <select
            value={selectedChapter}
            onChange={(e) => handleSelectChapter(e.target.value)}
            className="select-width"
            disabled={!selectedBook}
          >
            <option value="">Select a Chapter</option>
            {chapters.map((chapter) => (
              <option key={chapter.id} value={chapter.id}>
                {chapter.number}
              </option>
            ))}
          </select>
        </div>

        <div className="selection-label">
          <h2>Select a Verse</h2>
          <select
            value={selectedVerse}
            onChange={(e) => handleSelectVerse(e.target.value)}
            className="select-width"
            disabled={!selectedChapter}
          >
            <option value="">Select a Verse</option>
            {verses.map((verse) => (
              <option key={verse.id} value={verse.id}>
                {verse.reference}
              </option>
            ))}
          </select>
        </div>

        <div className="selectedBibleVerse-parent">
          <h2>Selected Verse:</h2>
          {verseLoading ? (
            <div className="loader">
              <ClipLoader size={40} color={"#c9ce8c"} loading={verseLoading} speedMultiplier={1} />
            </div>
          ) : (
            <p>{stripHtmlTagsAndVerseNumber(verseText)}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Bible;