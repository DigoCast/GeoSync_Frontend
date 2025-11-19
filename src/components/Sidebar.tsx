import { NavLink } from "react-router-dom";

const Sidebar = ({ onLinkClick }: { onLinkClick: () => void }) => {
  return (
    <aside className="w-full h-full border-r border-border">
      <NavLink to="/" onClick={onLinkClick}>
        <div className="flex items-center space-x-3 p-6 text-2xl font-bold ">
          <i className="fa-solid fa-map bg-linear-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent"></i>
          <span className="hover:text-shadow-lg text-shadow-indigo-300 transition-all duration-200">GeoSync</span>
        </div>
      </NavLink>

      <nav className="flex-1 p-4 space-y-2">
        <SidebarLink to="/continente" icon="fa-earth-americas" label="Continentes" onClick={onLinkClick} />
        <SidebarLink to="/pais" icon="fa-flag-usa" label="Países" onClick={onLinkClick} />
        <SidebarLink to="/cidade" icon="fa-city" label="Cidades" onClick={onLinkClick} />
        <SidebarLink to="/bandeiras" icon="fa-flag" label="Bandeiras" onClick={onLinkClick} />
      </nav>
    </aside>
  );
};

const SidebarLink = ({ to, icon, label, onClick }: { to: string; icon: string; label: string; onClick: () => void }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center gap-3 p-3 rounded-lg
      hover:bg-primary-hover hover:text-white 
      transition-all duration-200
      ${isActive ? "bg-primary text-white" : ""}`
    }
  >
    <i className={`fa-solid ${icon}`}></i>
    <span>{label}</span>
  </NavLink>
);

export default Sidebar;
