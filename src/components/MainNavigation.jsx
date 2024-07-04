import "./MainNavigation.css";
import { useNavigate } from "react-router-dom";

function MainNavigation({ title, children }) {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

  return (
    <>
      <nav className="navbar">
        <p onClick={handleHome}>{title}</p>
        <div className="navDiv">
          <span>{children}</span>
        </div>
      </nav>
    </>
  );
}

export default MainNavigation;
