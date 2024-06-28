// import { useEffect, useState } from "react";
// import "./AllStyles.css";

// function BibleVersions({ onSelectVersion }) {
//   const [bibles, setBibles] = useState([]);

//   useEffect(() => {
//     const fetchBibles = async () => {
//       try {
//         const response = await fetch(
//           "https://api.scripture.api.bible/v1/bibles",
//           {
//             headers: {
//               "api-key": "8b8e15ab30542ab6ae60737cc6482eed",
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }

//         const data = await response.json();
//         setBibles(data.data);
//       } catch (error) {
//         console.error("Error fetching bibles:", error);
//       }
//     };

//     fetchBibles();
//   }, []);

//   return (
//     <>
//       <div className="bibleVersion-parent">
//         <h1>Select a Bible Version</h1>
//         <select onChange={(e) => onSelectVersion(e.target.value)}>
//           <option value="">-- Select a Version --</option>
//           {bibles.map((bible) => (
//             <option key={bible.id} value={bible.id}>
//               {bible.name}
//             </option>
//           ))}
//         </select>
//       </div>
//     </>
//   );
// }

// export default BibleVersions;
