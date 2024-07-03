import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
function BlogDetailPage() {
  const location = useLocation();
  const { verse } = location.state || {};

  const summary =
    "Explanation Of The Verse";

  return (
    <div className="detailPage-parent">
         <NavLink to='/blog'><span><BiArrowBack color="#c9ce8c" size={40}/></span></NavLink>
      <div className="detailPage">
        <h1>Insightful Exegesis</h1>
        {verse && (
          <div className="detailPage-text">
            <h2>Verse of the Day</h2>
            <p>{verse.text}</p>
            <p>
              {verse.bookname} {verse.chapter}:{verse.verse}
            </p>
            <h2>Reflection:</h2>
            <p>{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogDetailPage;
