import { NavLink, useNavigate } from "react-router-dom";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  // const navigate = useNavigate();
  function clickHandler() {
    setIsLoggedIn(false);
    localStorage.removeItem("admintoken");
    // navigate("/");
  }
  return (
    <nav className="bg-[#f1e7e7] py-4 shadow-md border-b-2">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-around px-4">
        {/* Logo */}
        <h1 className="text-3xl font-bold text-blue-700 mb-2 sm:mb-0">GramFund</h1>

        {/* Navigation Links */}
        <div className="flex  gap-6 items-center text-gray-800 font-medium">
          <NavLink to="/" className={({ isActive }) =>
            !isActive ? "text-indigo-600 px-5 font-semibold" : "border-b-2 border-blue-700 px-5"}>Home</NavLink>
          <NavLink to="/fund" className={({ isActive }) =>
            !isActive ? "text-indigo-600 px-5 font-semibold" : "border-b-2 border-blue-700 px-5"}>Fund</NavLink>
          <NavLink to="/complain" className={({ isActive }) =>
            !isActive ? "text-indigo-600 px-5 font-semibold" : "border-b-2 border-blue-700 px-5"}>Complain</NavLink>

          {!isLoggedIn ? (
            <NavLink to="/admin" >
              <button className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-1 rounded-md  ">
                Log In
              </button>
            </NavLink>
          ) : (
            <NavLink to="/admin/dashboard" >
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md transition duration-200"
              >
                Dashboard
              </button>
            </NavLink>
          )}
          {/* log out button  */}
          {isLoggedIn && (
            <button
              onClick={clickHandler}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md md-4 transition duration-200">
              Log Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
