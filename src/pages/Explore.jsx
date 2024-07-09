import "./AllStyles.css";
import { SlCalender } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

function Explore() {
    const navigate = useNavigate();
    
    const formatDate = (date) => {
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
      };
      const todayDate = formatDate(new Date());

    const handleViewVotd = () => {
        navigate("/blog");
      };


  return (
    <div className="explorePage-parent">
      <h2>Explore More</h2>
      <hr color="#3e432f" />

      <div onClick={handleViewVotd} className="explore-info-holder">
        <span className="exloreDateIcon"><SlCalender color="#3e432f" size={20}/> {todayDate}.</span>
        <div>
          <img src="/images/bible-01.jpg" alt="bible img" />
        </div>
        <h3>Discover Sacred Daily Verses:</h3>
        <span>
          Are you looking for a comprehensive and enriching experience with the
          Bible? Look no further than the GraceGuide app, a one-stop
          destination for all your spiritual needs...
        </span>
        <hr color="#3e432f"/>
      </div>
    </div>
  );
}

export default Explore;
