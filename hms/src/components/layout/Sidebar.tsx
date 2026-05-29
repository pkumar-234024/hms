import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";
import "./Sidebar.css";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const role = user?.roles?.[0] || "";
  const displayName = user?.firstName
    ? `${user.firstName}${user.lastName ? " " + user.lastName : ""}`
    : user?.email || "User";
  const initials = user?.firstName
    ? user.firstName.charAt(0).toUpperCase()
    : "U";
  const isAdmin = role === "Super Admin" || role === "Admin";
  const brandTitle = role === "Doctor" ? "Clinical Clarity" : "Admin Center";
  const brandSubtitle =
    role === "Doctor" ? "Admin Center" : "Medical Management";
  const navItems = [
    {
      to: isAdmin
        ? "/admin"
        : role === "Doctor"
          ? "/doctor/dashboard"
          : "/patient/dashboard",
      icon: "dashboard",
      label: "Overview",
      end: true,
    },
    {
      to:
        role === "Patient"
          ? "/book"
          : role === "Doctor"
            ? "/doctor/patients"
            : "/admin/doctors",
      icon: "group",
      label: "Patients",
    },
    {
      to:
        role === "Patient"
          ? "/book"
          : role === "Doctor"
            ? "/doctor/schedule"
            : "/settings",
      icon: "calendar_month",
      label: "Schedules",
    },
    // {
    //   to: role === "Patient" ? "/patient/reports" : "/settings",
    //   icon: "biotech",
    //   label: "Lab Reports",
    // },
    // { to: "/settings", icon: "local_pharmacy", label: "Pharmacy" },
    // {
    //   to: isAdmin
    //     ? "/admin"
    //     : role === "Doctor"
    //       ? "/doctor/dashboard"
    //       : "/patient/dashboard",
    //   icon: "analytics",
    //   label: "Analytics",
    // },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <aside className="sidebar clinical-sidebar">
      <NavLink to="/" className="sidebar__brand">
        <span className="sidebar__brand-mark material-symbols-outlined">
          {role === "Doctor" ? "medical_services" : "medical_information"}
        </span>
        <span>
          <span className="sidebar__brand-name">{brandTitle}</span>
          <span className="sidebar__brand-subtitle">{brandSubtitle}</span>
        </span>
      </NavLink>

      <nav className="sidebar__nav">
        {navItems.map((item) => (
          <NavLink
            key={`${item.label}-${item.to}`}
            to={item.to}
            className={({ isActive }) =>
              `sidebar__item ${isActive ? "sidebar__item--active" : ""}`
            }
            end={item.end}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__footer">
        {/* <button className="sidebar__emergency">
          <span className="material-symbols-outlined">emergency_home</span>
          Emergency Alert
        </button> */}
        <div className="sidebar__user">
          <div className="sidebar__avatar">{initials}</div>
          <div className="sidebar__user-info">
            <div className="sidebar__user-name">{displayName}</div>
            <div className="sidebar__user-role">{role || "User"}</div>
          </div>
        </div>
        <button onClick={handleLogout} className="sidebar__logout">
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "18px" }}
          >
            logout
          </span>
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
