import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";
import logo from "../../images/logo.svg";

function Header({
  handleAddClick,
  handleRegisterClick,
  handleLoginClick,
  weatherData,
  isLoggedIn,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentUser = useContext(CurrentUserContext);
  const userInitial = currentUser?.name?.[0]?.toUpperCase();

  return (
    <header className="header">
      <NavLink to="/">
        <img className="header__logo" src={logo} alt="WTWR Logo" />
      </NavLink>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <div className="header__right">
        <ToggleSwitch />

        {isLoggedIn ? (
          <>
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn"
            >
              + Add clothes
            </button>

            <NavLink className="header__nav-link" to="/profile">
              <div className="header__user-container">
                <p className="header__username">{currentUser?.name}</p>

                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="header__avatar"
                  />
                ) : (
                  <div className="header__avatar-placeholder">
                    {userInitial}
                  </div>
                )}
              </div>
            </NavLink>
          </>
        ) : (
          <>
            <button type="button" onClick={handleRegisterClick}>
              Sign up
            </button>

            <button type="button" onClick={handleLoginClick}>
              Log in
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
