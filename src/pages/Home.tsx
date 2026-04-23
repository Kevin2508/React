import { Link } from "react-router-dom";
import { Heading } from "../components/Heading";
import { Button } from "@/components/ui/button";

export const Home = () => {
  return (
    <>
      <div className="py-5 px-100 h-3/6">
            <Heading headingText={"Home page"}></Heading>

        <div className="border border-emerald-50 p-10 flex justify-center flex-col ">
            <Button className="rounded-2xl py-2 px-10 h-8 my-5 hover:bg-gray-200 hover:text-black hover:border-black outline-1 "><Link to={"/login"}>Login</Link></Button>
            
            <Button className="rounded-2xl py-2 px-10 h-8 my-5 hover:bg-gray-200 hover:text-black hover:border-black outline-1 "><Link to={"/register"}>Sign up</Link></Button>
        </div>
      </div>
    </>
  );
};
