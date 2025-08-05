import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useState,useEffect } from "react";
import Home from "./page/Home";
import Fund from "./page/Fund";
import Complain from "./page/Complain";
import Admin from "./page/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./page/Dashboard";
import FundUpdatePage from "./page/FundUpdatePage";
import NewFunds from "./page/NewFunds";
// import { BrowserRouter } from "react-router-dom";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("admintoken"));
  useEffect(() => {
    const token = localStorage.getItem("admintoken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="bg-[#e0e0e0]">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fund" element={<Fund isLoggedIn={isLoggedIn} />} />
        <Route path="/complain" element={<Complain />} />
        <Route path="/admin" element={<Admin setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute> <Dashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </ProtectedRoute>}></Route>
        <Route path="/fund/edit/:id" element={<ProtectedRoute> <FundUpdatePage />  </ProtectedRoute>}></Route>
        <Route path="/fund/newfunds" element={<ProtectedRoute> <NewFunds />  </ProtectedRoute>}></Route>

      </Routes>
    </div>
  );
}
export default App;
