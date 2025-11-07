import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen border-r border-border">
      <NavLink to="/">
        <div className="flex items-center space-x-2 p-6 text-2xl font-bold">
          <i className="fa-solid fa-map bg-linear-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent"></i>
          <span>GeoSync</span>
        </div>
      </NavLink>

      <nav className="flex-1 p-4 space-y-2">
        <SidebarLink to="/continentes" icon="fa-earth-americas" label="Continentes" />
        <SidebarLink to="/paises" icon="fa-flag-usa" label="Países" />
        <SidebarLink to="/cidades" icon="fa-city" label="Cidades" />
        <SidebarLink to="/bandeiras" icon="fa-flag" label="Bandeiras" />
      </nav>
    </aside>
  );
};

const SidebarLink = ({ to, icon, label }: { to: string; icon: string; label: string }) => (
  <NavLink
    to={to}
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
