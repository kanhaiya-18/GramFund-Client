import { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  // const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function clickHandler() {
    setIsLoggedIn(false);
    localStorage.removeItem("admintoken");
    // navigate("/");
    setIsMenuOpen(false);
  }
  const navlinks = (
    <>
      <NavLink to="/" className={({ isActive }) =>
        !isActive ? "text-indigo-600 px-5 font-semibold animate-slideDown" : "border-b-2 border-blue-700 px-5  animate-slideDown"}
        onClick={() => setIsMenuOpen(false)}>Home</NavLink>
      <NavLink to="/fund" className={({ isActive }) =>
        !isActive ? "text-indigo-600 px-5 font-semibold " : "border-b-2 border-blue-700 px-5 transition animate-slideDown"}
        onClick={() => setIsMenuOpen(false)}>Fund</NavLink>
      <NavLink to="/complain" className={({ isActive }) =>
        !isActive ? "text-indigo-600 px-5 font-semibold " : "border-b-2 border-blue-700 px-5 transition animate-slideDown"}
        onClick={() => setIsMenuOpen(false)}>Complain</NavLink>

      {!isLoggedIn ? (
        <NavLink to="/admin" >
          <button className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-1 rounded-md  transition animate-slideDown"
            onClick={() => setIsMenuOpen(false)}>
            Log In
          </button>
        </NavLink>
      ) : (
        <NavLink to="/admin/dashboard" >
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md transition animate-slideDown"
            onClick={() => setIsMenuOpen(false)}>
            Dashboard
          </button>
        </NavLink>
      )}
      {/* log out button  */}
      {isLoggedIn && (
        <button
          onClick={clickHandler}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md md-4 transition animate-slideDown">
          Log Out
        </button>
      )}
    </>
  )
  return (
    <nav className="bg-[#f1e7e7] py-4 shadow-md border-b-2">
      <div className="container mx-auto flex flex-row items-center justify-between md:justify-around px-4">
        {/* Logo */}
        <h1 className="text-3xl font-bold text-blue-800 mb-2 sm:mb-0">GramFund</h1>

        {/* desktop navigation*/}
        <div className="hidden md:flex  gap-6 md:items-center text-gray-800 font-medium">
          {navlinks}
        </div>
        {/* mobile navigation  */}
        {/* hamburger menu  */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen((prev) => (!prev))}>
            <svg className="w-6 h-6 text-blue-700" fill="none"
              stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden mt-3 px-4 space-y-3 flex flex-col justify-center items-center text-gray-800 font-medium animate-slideDown">
          {navlinks}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
