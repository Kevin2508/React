/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { Heading } from "../components/Heading";
import { useEffect, useState } from "react";
import API from "../config/utils";

// shadcn/ui imports — adjust paths if your setup differs
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface SignInBody {
  email: string;
  password: string;
  captcha: unknown;
}

export const Login2 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [imageCaptcha, setImageCaptcha] = useState("");
  const [textCaptcha, setTextCaptcha] = useState("");
  const [captchaFetchTime, setCaptchaFetchTime] = useState<number>(0);

  const fetchCaptcha = async (refresh = false) => {
    try {
      const url = refresh
        ? "http://localhost:3000/api/auth/captcha?refresh=true"
        : "http://localhost:3000/api/auth/captcha";
      const res = await API.get<string>(url);
      setImageCaptcha(res.data);
      setCaptchaFetchTime(Date.now());
    } catch (err) {
      console.error("Error fetching captcha:", err);
    }
  };

  const refreshCaptcha = function () {
    fetchCaptcha(true);
  };

  useEffect(() => {
    fetchCaptcha(true);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const elapsedTime = (Date.now() - captchaFetchTime) / 1000;
    if (elapsedTime < 3) {
      setError("Please verify again");
      fetchCaptcha();
      setTextCaptcha("");
      return;
    }
    const correctCaptcha = sessionStorage.getItem("captcha_answer");
    if (textCaptcha === correctCaptcha) {
      console.log("Login successs");
    } else {
      setError("Incorrect captcha, please try again.");
      fetchCaptcha();
      return;
    }

    const formdata: SignInBody = { email, password, captcha: textCaptcha };
    try {
      const res = await API.post("/auth/signin", formdata);
      console.log(res);
      localStorage.setItem("token", res.data.accessToken);
      // navigate("/dashboard");
      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      setError("Sign in failed");
    }
  };

  return (
    <>
      <Heading headingText="Login Page" />
      <div className="max-w-lg mx-auto mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <div
                  className="mb-2"
                  dangerouslySetInnerHTML={{ __html: imageCaptcha }}
                />
                <div className="flex items-center gap-2">
                  <Input
                    value={textCaptcha}
                    onChange={(e) => setTextCaptcha(e.target.value)}
                    placeholder="Enter captcha"
                  />
                  <Button variant="ghost" onClick={refreshCaptcha} aria-label="Refresh captcha">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 256 256"
                      fill="currentColor"
                    >
                      <g transform="scale(8.53333,8.53333)">
                        <path d="M15,3c-2.94691,0 -5.67058,1.08978 -7.74414,2.83594c-0.27716,0.2291 -0.40998,0.58936 -0.34789,0.94355c0.0621,0.35419 0.30956,0.64777 0.64813,0.76892c0.33857,0.12115 0.71611,0.05121 0.98882,-0.18317c1.72644,-1.45384 4.00199,-2.36523 6.45508,-2.36523c5.22661,0 9.45668,3.91362 9.95117,9h-2.95117l4,6l4,-6h-3.05078c-0.508,-6.16514 -5.65128,-11 -11.94922,-11zM4.30078,9l-4,6h2.69922c0,6.63552 5.36448,12 12,12c2.94691,0 5.67058,-1.08978 7.74414,-2.83594c0.27717,-0.2291 0.41,-0.58936 0.3479,-0.94356c-0.0621,-0.35419 -0.30957,-0.64778 -0.64814,-0.76893c-0.33857,-0.12115 -0.71612,-0.0512 -0.98883,0.18319c-1.72644,1.45384 -4.00199,2.36523 -6.45508,2.36523c-5.56448,0 -10,-4.43552 -10,-10h3.30078z"></path>
                      </g>
                    </svg>
                  </Button>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-center">
              <Button type="submit" className="w-full">
                <Link to="/dashboard" className="w-full block text-center">Login</Link>
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
};
