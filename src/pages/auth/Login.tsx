import React, { FormEvent, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";
import CryptoJS from "crypto-js";

const PasswordInput: React.FC<{
  value: string;
  onChange: (newValue: string) => void;
}> = ({ value, onChange }) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Password"
        className="border border-gray-300 rounded-md p-2 w-full"
      />
      <button
        type="button"
        onClick={handleClick}
        className="absolute inset-y-0 right-0 flex items-center px-3"
      >
        {show ? "Hide" : "Show"}
      </button>
    </div>
  );
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const hashFunction = async (password: string) => {
    const hash = CryptoJS.SHA256(password);
    return hash.toString(CryptoJS.enc.Hex);
  };

  const loginFunc = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hashedPassword = await hashFunction(password);
    // Your login API call here
    console.log({ email, password: hashedPassword });
  };

  const passwordChange = (newPassword: string) => {
    setPassword(newPassword);
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100 dark:bg-gray-800">
      <div className="max-w-sm p-4 bg-white shadow-md rounded-md">
        <form onSubmit={loginFunc}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
            className="border border-gray-300 rounded-md p-2 w-full mb-4"
          />
          <PasswordInput value={password} onChange={passwordChange} />
          <button
            type="submit"
            className="bg-teal-500 text-white p-2 rounded-md w-full mt-4"
          >
            로그인
          </button>
          <div className="mt-4">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse.credential);
                // Your Google login API call here
              }}
              onError={() => {
                console.error("Failed Login..");
              }}
              text="signin_with"
              theme="filled_blue"
            />
          </div>
          <div className="mt-4">
            <Link to="/signUp" className="text-teal-500 hover:underline">
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
