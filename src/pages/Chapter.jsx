// import React, { useEffect, useState } from 'react';

// const Chapter = () => {
//   const [books, setBooks] = useState([]);
//   const [selectedBook, setSelectedBook] = useState('');
//   const [chapters, setChapters] = useState([]);
//   const [selectedChapter, setSelectedChapter] = useState('');
//   const [verses, setVerses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch('https://bible-go-api.rkeplin.com/v1/books');
//         const data = await response.json();
//         setBooks(data);
//       } catch (error) {
//         setError('Failed to fetch books');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBooks();
//   }, []);

//   useEffect(() => {
//     if (selectedBook) {
//       const fetchChapters = async () => {
//         try {
//           setLoading(true);
//           const response = await fetch(`https://bible-go-api.rkeplin.com/v1/books/${selectedBook}`);
//           const data = await response.json();
//           setChapters(data.chapters);
//         } catch (error) {
//           setError('Failed to fetch chapters');
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchChapters();
//     }
//   }, [selectedBook]);

//   useEffect(() => {
//     if (selectedBook && selectedChapter) {
//       const fetchChapter = async () => {
//         try {
//           setLoading(true);
//           const response = await fetch(`https://bible-go-api.rkeplin.com/v1/books/${selectedBook}/chapters/${selectedChapter}`);
//           const data = await response.json();
//           setVerses(data);
//         } catch (error) {
//           setError('Failed to fetch chapter data');
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchChapter();
//     }
//   }, [selectedBook, selectedChapter]);

//   const handleBookChange = (e) => {
//     setSelectedBook(e.target.value);
//     setSelectedChapter('');
//     setVerses([]);
//   };

//   const handleChapterChange = (e) => {
//     setSelectedChapter(e.target.value);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div>
//       <div>
//         <label htmlFor="book-select">Select Book:</label>
//         <select id="book-select" value={selectedBook} onChange={handleBookChange}>
//           <option value="">--Please choose a book--</option>
//           {books.map((book) => (
//             <option key={book.id} value={book.id}>
//               {book.name}
//             </option>
//           ))}
//         </select>
//       </div>
//       {selectedBook && (
//         <div>
//           <label htmlFor="chapter-select">Select Chapter:</label>
//           <select id="chapter-select" value={selectedChapter} onChange={handleChapterChange}>
//             <option value="">--Please choose a chapter--</option>
//             {chapters.map((chapter, index) => (
//               <option key={index} value={chapter}>
//                 {chapter}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}
//       {verses.length > 0 && (
//         <div>
//           <h1>Chapter {selectedChapter}</h1>
//           {verses.map((verse) => (
//             <p key={verse.id}>
//               <strong>{verse.verseId}</strong> <span>{verse.verse}</span>
//             </p>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chapter;
