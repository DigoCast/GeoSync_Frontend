import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Sidebar from "../components/Sidebar";
import ThemeToggle from "../components/ThemeToggle";

const AppRouters = () => {
  return (
    <div className="w-full min-h-screen flex text-text-primary bg-background dark:text-text-primary dark:bg-background transition duration-150">
      <Router>
        <div className="w-64">
          <Sidebar />
        </div>
        <div className="w-full">
          <header className="fixed right-0">
            <ThemeToggle />
          </header>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default AppRouters;
