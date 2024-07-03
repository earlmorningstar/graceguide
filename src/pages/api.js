export const fetchVerseOfTheDay = async () => {
    try {
      const response = await fetch('https://beta.ourmanna.com/api/v1/get?format=json&order=daily', {
        headers: {
          'Accept': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const { text, reference, version } = data.verse.details;
      const [bookname, chapterVerse] = reference.split(' ');
      const [chapter, verse] = chapterVerse.split(':');
      return {
        text,
        bookname,
        chapter,
        verse,
        version
      };
    } catch (error) {
      console.error('Failed to fetch votd:', error);
      throw error;
    }
  }; 



// // export const fetchVerseOfTheDay = async () => {
// //     try {
// //       const response = await fetch('https://labs.bible.org/api/?passage=votd&type=json');
// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`);
// //       }
// //       const data = await response.json();
// //       return data[0]; 
// //     } catch (error) {
// //       console.error('Failed to fetch votd:', error);
// //       throw error;
// //     }
// //   };
  
  