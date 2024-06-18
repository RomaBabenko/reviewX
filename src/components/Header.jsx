import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import logoPng from "../assets/images/logo.png";
import profilePng from "../assets/images/profile.png";
import "../assets/styles/scss/_all.scss";
import { translate, switchLanguage } from "../translations/TranslationUtils";
import Search from "./Search/Search";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSearchFilter,
  resetFilter,
} from "../components/redux/slices/searchFilterSlice";

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );
  const searchFilter = useSelector(selectSearchFilter);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);

    if (authStatus) {
      const storedUsername = localStorage.getItem("username");
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    setIsAuthenticated(false);
    dispatch(resetFilter());
    navigate("/");
    window.location.reload();
  };

  const handleLogoClick = () => {
    navigate("/");
    window.location.reload(); 
  };
  

  return (
    <header className="header">
        <div className="logo">
          <img src={logoPng} alt="Logo" onClick={handleLogoClick} />
        </div>
          {isHomePage && <Search filter={searchFilter} />}
        <div className="auth-icons">
          <button
            onClick={() => switchLanguage(language, setLanguage)}
            className="language-btn"
          >
            {language === "en" ? "EN" : "UA"}
          </button>
          {isAuthenticated ? (
            <>
              <span>{username}</span>
              <div className="prifile-icon">
                <img src={profilePng} alt="Profile" />
              </div>

              <button onClick={handleLogout} className="auth-link">
                <h3>{translate(language, "logout")}</h3>
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="auth-link">
                <h3>{translate(language, "register")}</h3>
              </Link>
              <Link to="/login" className="auth-link">
                <h3>{translate(language, "login")}</h3>
              </Link>
            </>
          )}
        </div>
    </header>
  );
}

export default Header;
