import { useLocation } from "react-router-dom";

function BlogDetailPage() {
  const location = useLocation();
  const { verse } = location.state || {};

  const summary =
    "Explanation Of The Verse";

  return (
    <>
      <div>
        <h1>Blog Detail Page</h1>
        {verse && (
          <div>
            <h2>Verse of the Day</h2>
            <p>{verse.text}</p>
            <p>
              {verse.bookname} {verse.chapter}:{verse.verse}
            </p>
            <h3>Summary/Explanation</h3>
            <p>{summary}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default BlogDetailPage;
