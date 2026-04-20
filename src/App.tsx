import { Route,Routes, BrowserRouter as Router } from "react-router-dom";
import { Navbar } from "./components/common/Navbar";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
const App = () =>{
    return(
        <Router>
            <Navbar>
            </Navbar>
                <Routes>
                    <Route path="/home" element={<Home/>}></Route>
                    <Route path="/login" element={<Login/>}></Route>
                    <Route path="/register" element={<Register/>}></Route>
                </Routes>
        </Router>
    )
}

export default App;