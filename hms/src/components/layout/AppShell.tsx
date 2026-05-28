import { Outlet } from "react-router-dom";
import TopNav from "./TopNav";
import BottomNav from "./BottomNav";
import Sidebar from "./Sidebar";

interface NavItem {
  icon: string;
  label: string;
  path: string;
}

interface Props {
  navItems: NavItem[];
  avatarInitials?: string;
}

const AppShell = ({ navItems, avatarInitials }: Props) => (
  <div className="app-root">
    {/* TopNav for mobile only (hidden on desktop via CSS) */}
    <div className="mobile-only">
      <TopNav showAvatar avatarInitials={avatarInitials} />
    </div>

    {/* Desktop Sidebar (hidden on mobile via CSS) */}
    <Sidebar />

    <main className="app-shell">
      <div className="app-shell__content">
        <Outlet />
      </div>
    </main>
    <BottomNav items={navItems} />
  </div>
);

export default AppShell;
