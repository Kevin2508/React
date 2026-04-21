import { Link } from "react-router-dom";
import { Heading } from "../components/Heading";

export const Register = () => {
  return (
    <div>
      <Heading headingText="Register Page"></Heading>
      <div>
        <fieldset className="border my-5 mx-100 px-20 py-4 flex flex-col justify-between h-60 align-middle">
          <legend className="font-bold">Login</legend>
          <form action="" className="flex justify-between flex-col">
            <div className="m-2">
              <label htmlFor="userName">Username: &nbsp;</label>
              <input type="text" className="border" />
            </div>
            <div className="m-2">
              <label htmlFor="email">Email: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <input type="text" className="border" />
            </div>
            <div className="m-2">
              <label htmlFor="password">Password: &nbsp;&nbsp;</label>
              <input type="password" className="border" />
            </div>
            <div className="m-2 flex justify-center">
              <button className="bg-emerald-600 rounded-2xl py-2 px-10 my-5">
                <Link to={"/register"}>Register</Link>
              </button>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  );
};
