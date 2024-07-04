import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
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
    // setAudioUrl("");
  };

  const handleSelectBook = (bookId) => {
    setSelectedBook(bookId);
    setChapters([]);
    setSelectedChapter("");
    setVerses([]);
    setSelectedVerse("");
    setVerseText("");
    // setAudioUrl("");
  };

  const handleSelectChapter = (chapterId) => {
    setSelectedChapter(chapterId);
    setVerses([]);
    setSelectedVerse("");
    setVerseText("");
    // setAudioUrl("");
  };

  const handleSelectVerse = (verseId) => {
    setSelectedVerse(verseId);
  };

  const fetchVerseText = async (versionId, verseId) => {
    setVerseLoading(true);
    try {
      const response = await fetch(
        `https://api.scripture.api.bible/v1/bibles/${versionId}/verses/${verseId}`,
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
  

  const fetchNextVerse = async () => {
    if (!selectedVerse) return;

    const currentVerseIndex = verses.findIndex((verse) => verse.id === selectedVerse);
    const nextVerse = verses[currentVerseIndex + 1];

    if (nextVerse) {
      setSelectedVerse(nextVerse.id);
      fetchVerseText(selectedVersion, nextVerse.id);
    //   fetchVerseAudio(selectedVersion, selectedChapter, nextVerse.id);
    } else {
      const currentChapterIndex = chapters.findIndex((chapter) => chapter.id === selectedChapter);
      const nextChapter = chapters[currentChapterIndex + 1];

      if (nextChapter) {
        handleSelectChapter(nextChapter.id);
        try {
          const response = await fetch(
            `https://api.scripture.api.bible/v1/bibles/${selectedVersion}/chapters/${nextChapter.id}/verses`,
            {
              headers: { "api-key": "8b8e15ab30542ab6ae60737cc6482eed" },
            }
          );
          const data = await response.json();
          setVerses(data.data);
          const firstVerseId = data.data[0].id;
          setSelectedVerse(firstVerseId);
          fetchVerseText(selectedVersion, firstVerseId);
        //   fetchVerseAudio(selectedVersion, nextChapter.id, firstVerseId);
        } catch (error) {
          console.error("Error fetching next chapter verses:", error);
        }
      } else {
        const currentBookIndex = books.findIndex((book) => book.id === selectedBook);
        const nextBook = books[currentBookIndex + 1];

        if (nextBook) {
          handleSelectBook(nextBook.id);
          try {
            const response = await fetch(
              `https://api.scripture.api.bible/v1/bibles/${selectedVersion}/books/${nextBook.id}/chapters`,
              {
                headers: { "api-key": "8b8e15ab30542ab6ae60737cc6482eed" },
              }
            );
            const data = await response.json();
            setChapters(data.data);
            const firstChapterId = data.data[0].id;
            handleSelectChapter(firstChapterId);
            const chapterResponse = await fetch(
              `https://api.scripture.api.bible/v1/bibles/${selectedVersion}/chapters/${firstChapterId}/verses`,
              {
                headers: { "api-key": "8b8e15ab30542ab6ae60737cc6482eed" },
              }
            );
            const chapterData = await chapterResponse.json();
            setVerses(chapterData.data);
            const firstVerseId = chapterData.data[0].id;
            setSelectedVerse(firstVerseId);
            fetchVerseText(selectedVersion, firstVerseId);
            // fetchVerseAudio(selectedVersion, firstChapterId, firstVerseId);
          } catch (error) {
            console.error("Error fetching next book chapters and verses:", error);
          }
        } else {
          console.log("No more books in this Bible version");
        }
      }
    }
  };

  const fetchPreviousVerse = async () => {
    if (!selectedVerse) return;

    const currentVerseIndex = verses.findIndex((verse) => verse.id === selectedVerse);
    const previousVerse = verses[currentVerseIndex - 1];

    if (previousVerse) {
      setSelectedVerse(previousVerse.id);
      fetchVerseText(selectedVersion, previousVerse.id);
    //   fetchVerseAudio(selectedVersion, selectedChapter, previousVerse.id);
    } else {
      const currentChapterIndex = chapters.findIndex((chapter) => chapter.id === selectedChapter);
      const previousChapter = chapters[currentChapterIndex - 1];

      if (previousChapter) {
        handleSelectChapter(previousChapter.id);
        try {
          const response = await fetch(
            `https://api.scripture.api.bible/v1/bibles/${selectedVersion}/chapters/${previousChapter.id}/verses`,
            {
              headers: { "api-key": "8b8e15ab30542ab6ae60737cc6482eed" },
            }
          );
          const data = await response.json();
          setVerses(data.data);
          const lastVerseId = data.data[data.data.length - 1].id;
          setSelectedVerse(lastVerseId);
          fetchVerseText(selectedVersion, lastVerseId);
        //   fetchVerseAudio(selectedVersion, previousChapter.id, lastVerseId);
        } catch (error) {
          console.error("Error fetching previous chapter verses:", error);
        }
      } else {
        const currentBookIndex = books.findIndex((book) => book.id === selectedBook);
        const previousBook = books[currentBookIndex - 1];

        if (previousBook) {
          handleSelectBook(previousBook.id);
          try {
            const response = await fetch(
              `https://api.scripture.api.bible/v1/bibles/${selectedVersion}/books/${previousBook.id}/chapters`,
              {
                headers: { "api-key": "8b8e15ab30542ab6ae60737cc6482eed" },
              }
            );
            const data = await response.json();
            setChapters(data.data);
            const lastChapterId = data.data[data.data.length - 1].id;
            handleSelectChapter(lastChapterId);
            const chapterResponse = await fetch(
              `https://api.scripture.api.bible/v1/bibles/${selectedVersion}/chapters/${lastChapterId}/verses`,
              {
                headers: { "api-key": "8b8e15ab30542ab6ae60737cc6482eed" },
              }
            );
            const chapterData = await chapterResponse.json();
            setVerses(chapterData.data);
            const lastVerseId = chapterData.data[chapterData.data.length - 1].id;
            setSelectedVerse(lastVerseId);
            fetchVerseText(selectedVersion, lastVerseId);
            // fetchVerseAudio(selectedVersion, lastChapterId, lastVerseId);
          } catch (error) {
            console.error("Error fetching previous book chapters and verses:", error);
          }
        } else {
          console.log("No more books in this Bible version");
        }
      }
    }
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

        // Moved particular bible version to the top
        const reorderedBibles = data.data.sort((a, b) => {
          const order = [ "de4e12af7f28f599-02",
            "06125adad2d5898a-01", 
            "7142879509583d59-01", 
            "9879dbb7cfe39e4d-01", 
            "01b29f4b342acc35-01", ]; // Bible version actual IDs from the api
          if (order.includes(a.id)) {
            return -1;
          }
          if (order.includes(b.id)) {
            return 1;
          }
          return 0;
        });

        setBibles(reorderedBibles);
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
      fetchVerseText(selectedVersion, selectedVerse);
    //   fetchVerseAudio(selectedVersion, selectedChapter, selectedVerse);
    }
  }, [selectedVerse, selectedVersion, selectedChapter]);

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
        <div className="ourJourney-discoveryHolder" id="nextPrevious-buttons">
          <button onClick={fetchPreviousVerse}>Previous Verse</button>
          <button onClick={fetchNextVerse}>Next Verse</button>
        </div>
      </div>
    </div>
  );
}

export default Bible;