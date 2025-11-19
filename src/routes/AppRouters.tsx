import { NavLink, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Sidebar from "../components/Sidebar";
import ThemeToggle from "../components/ThemeToggle";
import Continente from "../pages/Continente";
import Pais from "../pages/Pais";
import Cidade from "../pages/Cidade";
import Bandeiras from "../pages/Bandeiras";
import { useState } from "react";

const AppRouters = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="w-full min-h-screen flex text-text-primary bg-background dark:text-text-primary dark:bg-background transition duration-150">
      <Router>
        <div className="hidden md:block w-64 shrink-0">
          <Sidebar onLinkClick={() => {}}/>
        </div>

        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={toggleMobileMenu}
          />
        )}

        <div
          className={`
            fixed top-0 left-0 h-full w-64 shrink-0 z-50 
            bg-background dark:bg-background border-r border-border
            transition-transform duration-300 ease-in-out
            transform md:hidden
            ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <Sidebar onLinkClick={toggleMobileMenu} /> 
        </div>

        <div className="w-full">
          <header className="fixed top-0 left-0 w-full flex items-center p-5 z-30 bg-background dark:bg-background border-b border-border md:hidden">
              <button 
                  onClick={toggleMobileMenu} 
                  className="p-2 rounded-lg bg-surface dark:bg-surface border border-border hover:bg-hover"
                  aria-label="Toggle menu"
              >
                  <i className="fa-solid fa-bars text-text-primary"></i>
              </button>
              <NavLink to="/">
                <div className="flex items-center space-x-1 ml-2 text-2xl font-bold ">
                  <i className="fa-solid fa-map bg-linear-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent"></i>
                  <span className="hover:text-shadow-lg text-shadow-indigo-300 transition-all duration-200">GeoSync</span>
                </div>
              </NavLink>
          </header>
          <div className="fixed top-7 right-7 z-40">
            <ThemeToggle />
          </div>
          <div className="pt-[77px] md:pt-0"> 
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/continente" element={<Continente />} />
              <Route path="/pais" element={<Pais />} />
              <Route path="/cidade" element={<Cidade />} />
              <Route path="/bandeiras" element={<Bandeiras />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default AppRouters;
