import "./SideBar.css";
import avatar from "../../images/avatar.png";

export default function SideBar() {
  const username = "Terrence Tegegne";

  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        <img src={avatar} alt="Terrence Tegegne" className="sidebar__avatar" />
        <span className="sidebar__username">{username}</span>
      </div>
    </aside>
  );
}
