import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";
// import avatar from "../../images/avatar.png";

export default function SideBar({ onEditProfileClick, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  const userInitial = currentUser?.name?.[0]?.toUpperCase();

  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        {currentUser?.avatar ? (
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="sidebar__avatar"
          />
        ) : (
          <div className="sidebar__avatar-placeholder">{userInitial}</div>
        )}

        <span className="sidebar__username">{currentUser?.name}</span>
      </div>

      <button
        type="button"
        className="sidebar__edit-profile"
        onClick={onEditProfileClick}
      >
        Edit profile
      </button>

      <button type="button" className="sidebar__sign-out" onClick={onSignOut}>
        Sign out
      </button>
    </aside>
  );
}
