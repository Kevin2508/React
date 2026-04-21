import {  Link, useNavigate } from "react-router-dom";
import { Heading } from "../components/Heading";
import {  useState } from "react";
import API from "../lib/utils";

interface SignInBody {
  email: string;
  password: string;
}

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // const [loading,setLoading] = useState(false);
  // const [error,setError] = useState("");
  // const [success,setSuccess] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    // setLoading(true);
    // setError("");
    // setSuccess("");

    const formdata: SignInBody = { email, password };
    try {
      const res = await API.post("/auth/signin", formdata);
      console.log(res);
      
      localStorage.setItem("token", res.data.accessToken);
      
      navigate("/dashboard");
     
    } catch (error) {
      console.log(error);
    }
  };
  return (
    // <div className="container flex justify-center">
    //     <h1 className='font-extrabold p-4 text-[30px]'>Login Page</h1>
    // </div>
    <>
      <Heading headingText="Login Page"></Heading>
      <div>
        <fieldset className="border my-5 mx-100 px-20 py-4 flex flex-col justify-between h-60 align-middle">
          <legend className="font-bold">Login</legend>
          <form onSubmit={handleLogin} className="flex justify-between flex-col">
            <div className="m-2">
              <label htmlFor="email">
                Email:
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </label>
              <input
                type="text"
                className="border"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="m-2">
              <label htmlFor="password">Password: &nbsp;&nbsp;</label>
              <input
                type="password"
                className="border"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="m-2 flex justify-center">
              <button onClick={handleLogin} className="bg-emerald-600 rounded-2xl py-2 px-10 my-5">
               
                <Link to={"/dashboard"}>Login</Link>
              </button>
            </div>
          </form>
        </fieldset>
      </div>
    </>
  );
};
