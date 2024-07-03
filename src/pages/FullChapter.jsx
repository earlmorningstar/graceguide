// import { NavLink, useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { ClipLoader } from "react-spinners";
// import "./AllStyles.css";

// function FullChapter() {
//   const location = useLocation();
//   const { versionId, bookId, chapterId } = location.state || {};
//   const [bookName, setBookName] = useState("");
//   const [chapterNumber, setChapterNumber] = useState("");
//   const [chapterText, setChapterText] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchChapter = async () => {
//       try {
//         const response = await fetch(
//           `https://api.scripture.api.bible/v1/bibles/${versionId}/chapters/${chapterId}/verses`,
//           {
//             headers: { "api-key": "8b8e15ab30542ab6ae60737cc6482eed" },
//           }
//         );
//         const data = await response.json();
        
//         const firstVerse = data.data[0];
//         const fullChapterText = data.data.map(verse => verse.text).join(' ');

//         setBookName(firstVerse.reference.split(" ")[0]); 
//         setChapterNumber(firstVerse.chapterId.split(".")[1]); 
//         setChapterText(fullChapterText);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching chapter:", error);
//         setLoading(false);
//       }
//     };

//     if (versionId && bookId && chapterId) {
//       fetchChapter();
//     }
//   }, [versionId, bookId, chapterId]);

//   if (loading) {
//     return (
//       <div className="loader" id="loader-id">
//         <ClipLoader size={60} color={"#c9ce8c"} loading={loading} speedMultiplier={1} />
//       </div>
//     );
//   }

//   return (
//     <div className="fullChapter-parent">
//         <NavLink to='/bible'>BACK</NavLink>
//       <div className="fullChapter-chapter-holder">
//         <div>
//           <span>{bookName}: {chapterNumber}</span>
//         </div>

//         <div>
//           <div dangerouslySetInnerHTML={{ __html: chapterText }} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FullChapter;

