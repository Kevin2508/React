import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  const loggedOut = () => {
    localStorage.setItem("token", "");
    navigate("/home");
  };
  return (
    <div className=" bg-emerald-600 text-emerald-100 font-bold ">
      <ul className="flex justify-end p-2">
        <li className="mx-3 hover:underline ">
          <Link to={"/Home"}>Home</Link>
        </li>
        {isLoggedIn?<li className="mx-3 hover:underline ">
          <Link to={"/Login"}>Login</Link>
        </li>:""}
        <li className="mx-3 hover:underline ">
          <Link to={"/Register"}>Register</Link>
        </li>
        <li className="mx-3 hover:underline ">
          <Link to={"/about"}>About</Link>
        </li>
        <li>
          {isLoggedIn ? (
            <span onClick={loggedOut} className="mx-3 hover:underline ">
              Logout
            </span>
          ) : (
            ""
          )}
        </li>
      </ul>
    </div>
  );
};
