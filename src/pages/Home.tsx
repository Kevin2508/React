import { Link } from "react-router-dom";
import { Heading } from "../components/Heading";

export const Home = () => {
  return (
    <>
      <Heading headingText={"Home Page"}></Heading>
      <div className="py-5 px-100 h-3/6">
      
        <div className="border border-amber-50 p-10 flex justify-center flex-col ">
            <button className="bg-amber-600  rounded-2xl py-2 px-10 my-5"><Link to={"/login"}>Login</Link></button>
            
            <button className="bg-amber-600  rounded-2xl py-2 px-10 my-5" ><Link to={"/register"}>Register</Link></button>
        </div>
      </div>
    </>
  );
};
