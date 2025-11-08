import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Sidebar from "../components/Sidebar";
import ThemeToggle from "../components/ThemeToggle";
import Continente from "../pages/Continente";
import Pais from "../pages/Pais";
import Cidade from "../pages/Cidade";

const AppRouters = () => {
  return (
    <div className="w-full min-h-screen flex text-text-primary bg-background dark:text-text-primary dark:bg-background transition duration-150">
      <Router>
        <div className="w-64">
          <Sidebar />
        </div>
        <div className="w-full">
          <header className="fixed right-0 m-7">
            <ThemeToggle />
          </header>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/continente" element={<Continente />} />
            <Route path="/pais" element={<Pais />} />
            <Route path="/cidade" element={<Cidade />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default AppRouters;
