import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Sidebar from "../components/Sidebar";

const AppRouters = () => {
  return (
    <div className="w-full min-h-screen flex">
        <div className="w-1/5 bg-fuchsia-700">
            <Sidebar />
        </div>
        <div className="w-4/5 bg-amber-500">
            <Router>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                </Routes>
            </Router>
        </div>
    </div>
  );
};

export default AppRouters;
