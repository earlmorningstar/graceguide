import { NavLink, Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

function ErrorPage() {
  return (
    <>
      <MainNavigation title="GraceGuide" />
      <main className="error-page-main">
        <h1>An error occured!!</h1>
        <p>Could not find this page. Please, come back soon.</p>
        <NavLink className="error-back-btn-link" to=".." relative="path">
          <button className="btn-style">Back to homepage</button>
        </NavLink>
      </main>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default ErrorPage;
