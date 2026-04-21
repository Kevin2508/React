import { Link, useNavigate } from "react-router-dom";
import { Heading } from "../components/Heading";
import { useEffect, useState } from "react";
import API from "../lib/utils";
interface signUpBody {
  success?: boolean;
  error?: string;
  data?: {
    userName: string;
    email: string;
    password: string;
  };
}

export const Register: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imageCaptcha, setImageCaptcha] = useState("");
  const [textCaptcha, setTextCaptcha] = useState("");
  const navigate = useNavigate();

  const fetchCaptcha = async () => {
    try {
      const res = await API.get<string>(
        "http://localhost:3000/api/auth/captcha",
      );
      console.log(res);
      setImageCaptcha(res.data);
    } catch (error) {
      console.error("Error fetching captcha:", error);
    }
  };

  const refreshCaptcha = function () {
    fetchCaptcha();
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const correctCaptcha = sessionStorage.getItem("captcha_answer");
    if (textCaptcha === correctCaptcha) {
      console.log("Login successs");
    } else {
      setError("Incorrect captcha, please try again.");
      fetchCaptcha();
    }
    const formData = {
      userName,
      email,
      password,
      captcha: textCaptcha,
    };
    setError("");
    setSuccess("");
    try {
      const res = await API.post<signUpBody>("/auth/signup", formData);
      const result = res.data;

      if (result?.success) {
        setSuccess("Registration successful");
        setUserName("");
        setEmail("");
        setPassword("");
        setTextCaptcha("");

      navigate("/login")
       
      } else {
        setError(result.error);
        fetchCaptcha();
      }
    } catch (error) {
      console.log(error);
    }
    // const result = await registerUser({userName:userName, email:email, password:password});
  };
  return (
    <div>
      <Heading headingText="Register Page"></Heading>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {success}
        </div>
      )}
      <div>
        <fieldset className="border my-5 mx-100 px-20 py-4 flex flex-col justify-between h-60 align-middle">
          <legend className="font-bold">Login</legend>

          <form className="flex justify-between flex-col">
            <div className="m-2">
              <label htmlFor="userName">Username: &nbsp;</label>
              <input
                type="text"
                className="border"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="m-2">
              <div dangerouslySetInnerHTML={{ __html: imageCaptcha }} />
              <span onClick={refreshCaptcha}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="30"
                  height="30"
                  viewBox="0,0,256,256"
                >
                  <g
                    fill="#ffffff"
                    fill-rule="nonzero"
                    stroke="none"
                    stroke-width="1"
                    stroke-linecap="butt"
                    stroke-linejoin="miter"
                    stroke-miterlimit="10"
                    stroke-dasharray=""
                    stroke-dashoffset="0"
                    font-family="none"
                    font-weight="none"
                    font-size="none"
                    text-anchor="none"
                  >
                    <g transform="scale(8.53333,8.53333)">
                      <path d="M15,3c-2.94691,0 -5.67058,1.08978 -7.74414,2.83594c-0.27716,0.2291 -0.40998,0.58936 -0.34789,0.94355c0.0621,0.35419 0.30956,0.64777 0.64813,0.76892c0.33857,0.12115 0.71611,0.05121 0.98882,-0.18317c1.72644,-1.45384 4.00199,-2.36523 6.45508,-2.36523c5.22661,0 9.45668,3.91362 9.95117,9h-2.95117l4,6l4,-6h-3.05078c-0.508,-6.16514 -5.65128,-11 -11.94922,-11zM4.30078,9l-4,6h2.69922c0,6.63552 5.36448,12 12,12c2.94691,0 5.67058,-1.08978 7.74414,-2.83594c0.27717,-0.2291 0.41,-0.58936 0.3479,-0.94356c-0.0621,-0.35419 -0.30957,-0.64778 -0.64814,-0.76893c-0.33857,-0.12115 -0.71612,-0.0512 -0.98883,0.18319c-1.72644,1.45384 -4.00199,2.36523 -6.45508,2.36523c-5.56448,0 -10,-4.43552 -10,-10h3.30078z"></path>
                    </g>
                  </g>
                </svg>
              </span>
              <input
                type="text"
                className="border"
                onChange={(e) => {
                  setTextCaptcha(e.target.value);
                }}
              />
            </div>
            <div className="m-2 flex justify-center">
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-emerald-600 rounded-2xl py-2 px-10 my-5"
              >
                <Link to={"/register"}>Register</Link>
              </button>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  );
};
