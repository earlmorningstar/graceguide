import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import SearchBar from "./SearchBar";
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
          <NavLink to="/blog" className="root-nav" activeClassName="active" end>
            VOTD
          </NavLink>
          <NavLink to="/programlist" className="root-nav" activeClassName="active" end>
            Program List
          </NavLink>
          <NavLink
            to="/programlist"
            className="root-nav"
            activeClassName="active"
            end
          >
            More
          </NavLink>
          <SearchBar />
        </div>
        <div className="hamburger-menu" onClick={toggleDropdown}>
          {isDropdownOpen ? (
            <RiCloseLargeFill size={26} color="#c9ce8c"/>
          ) : (
            <RxHamburgerMenu size={26} color="#c9ce8c"/>
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
              to="/blog"
              className="root-nav-dropDown"
              onClick={toggleDropdown}
              end
            >
              VOTD
            </NavLink>
            <NavLink
              to="/about"
              className="root-nav-dropDown"
              onClick={toggleDropdown}
              end
            >
             Program List
            </NavLink>
            <NavLink
              to="/about"
              className="root-nav-dropDown"
              onClick={toggleDropdown}
              end
            >
             Plans & Pricing
            </NavLink>
            <NavLink
              to="/about"
              className="root-nav-dropDown"
              onClick={toggleDropdown}
              end
            >
             Groups
            </NavLink>
            <NavLink
              to="/about"
              className="root-nav-dropDown"
              onClick={toggleDropdown}
              end
            >
             Book Online
            </NavLink>
            <SearchBar className="root-nav-dropDown" />
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
