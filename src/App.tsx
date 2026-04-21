import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { Navbar } from "./components/common/Navbar";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { About } from "./pages/About";
import { Dashboard } from "./pages/Dashboard";
import { useEffect, useState } from "react";
import { UnauthorizedPage } from "./pages/UnauthorizedPage";
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/about" element={<About />}></Route>
       {isLoggedIn?  <Route path="/dashboard" element={<Dashboard />}></Route>:<Route path="/dashboard" element={<UnauthorizedPage />}></Route>}
      </Routes>
    </Router>
  );
};

export default App;
