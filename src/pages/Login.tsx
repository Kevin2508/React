import { Link } from "react-router-dom";
import { Heading } from "../components/Heading";

export const Login = () => {
  return (
    // <div className="container flex justify-center">
    //     <h1 className='font-extrabold p-4 text-[30px]'>Login Page</h1>
    // </div>
    <>
      <Heading headingText="Login Page"></Heading>
      <div>
        <fieldset className="border my-5 mx-100 px-20 py-4 flex flex-col justify-between h-60 align-middle">
          <legend className="font-bold">Login</legend>
          <form action="" className="flex justify-between flex-col">
           
            <div className="m-2">
              <label htmlFor="email">Email: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <input type="text" className="border" />
            </div>
            <div className="m-2">
              <label htmlFor="password">Password: &nbsp;&nbsp;</label>
              <input type="password" className="border" />
            </div>
            <div className="m-2 flex justify-center">
              <button className="bg-amber-600 rounded-2xl py-2 px-10 my-5">
                <Link to={"/login"}>Login</Link>
              </button>
            </div>
          </form>
        </fieldset>
      </div>
    </>
  );
};
