import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
// import SearchBar from "./SearchBar";
import "./AllStyles.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiCloseLargeFill } from "react-icons/ri";

function RootLayout() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <>
      <MainNavigation title="GraceGuide">
        <div className="nav-links">
          <NavLink to="/" className="root-nav" activeClassName="active">
            Home
          </NavLink>
          <NavLink to="/bible" className="root-nav" activeClassName="active" end>
            Bible
          </NavLink>
          <NavLink to="/votd" className="root-nav" activeClassName="active" end>
            VOTD
          </NavLink>
          <NavLink
            to="/bible-reader"
            className="root-nav"
            activeClassName="active"
            end
          >
           Read Full Chapter
          </NavLink>
          {/* <SearchBar /> */}
        </div>
        <div className="hamburger-menu" onClick={toggleDropdown}>
          {isDropdownOpen ? (
            <RiCloseLargeFill size={35} color="#c9ce8c"/>
          ) : (
            <RxHamburgerMenu size={35} color="#c9ce8c"/>
          )}
        </div>
      </MainNavigation>
      {isDropdownOpen && (
        <div className="dropdown-menu">
          <div className="nav-link-dropDown">
            <NavLink
              to="/"
              className="root-nav-dropDown"
              onClick={toggleDropdown}
            >
              Home
            </NavLink>
            <NavLink
              to="/bible"
              className="root-nav-dropDown"
              onClick={toggleDropdown}
              end
            >
              Bible
            </NavLink>
            <NavLink
              to="/votd"
              className="root-nav-dropDown"
              onClick={toggleDropdown}
              end
            >
              VOTD
            </NavLink>
            <NavLink
              to="/bible-reader"
              className="root-nav-dropDown"
              onClick={toggleDropdown}
              end
            >
             Read Full Chapter
            </NavLink>
            {/* <SearchBar className="root-nav-dropDown" /> */}
          </div>
        </div>
      )}
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
