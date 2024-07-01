export const fetchVerseOfTheDay = async () => {
    const response = await fetch('https://labs.bible.org/api/?passage=votd&type=json');
    const data = await response.json();
    return data[0];
  };
  