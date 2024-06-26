import { NavLink } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

function ErrorPage(){
    return (<>
    <div className="error-page-css">
      <MainNavigation />
      <main className="error-page-main">
        <h1>An error occured!!</h1>
        <p>Could not find this page.</p>
        <NavLink className="back-btn-link" to=".." relative="path">
        <button className="btn-style">Back to homepage</button>
      </NavLink>
      </main>
    </div></>)
}

export default ErrorPage;