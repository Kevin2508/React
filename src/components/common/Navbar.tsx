import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
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
    window.location.href = "/home"
  };
  return (
    <div className=" bg-emerald-600 text-emerald-100 font-bold ">
      <ul className="flex justify-end p-2">
        <li className="mx-3 hover:underline ">
          <Link to={"/Home"}>Home</Link>
        </li>
        {isLoggedIn ? (
          <li className="mx-3 hover:underline ">
            <Link to={"/Login"}>Login</Link>
          </li>
        ) : (
          ""
        )}
        <li className="mx-3 hover:underline ">
          <Link to={"/Register"}>Register</Link>
        </li>
        <li className="mx-3 hover:underline ">
          <Link to={"/about"}>About</Link>
        </li>
        {/* <li>
          {isLoggedIn ? (
            <span onClick={loggedOut} className="mx-3 hover:underline ">
              Logout
            </span>
          ) : (
            ""
          )}
        </li> */}

        <li>
          {isLoggedIn ? (
            <span className="mx-3 hover:underline ">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="secondary">Logout</Button>
                </AlertDialogTrigger>
                <AlertDialogContent size="sm">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Do u really want to logout?
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={loggedOut}>Yes</AlertDialogCancel>
                    <AlertDialogAction>No</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </span>
          ) : (
            ""
          )}
        </li>
      </ul>
    </div>
  );
};
