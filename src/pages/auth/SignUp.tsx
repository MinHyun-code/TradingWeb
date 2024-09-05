import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/common/PasswordInput";
import { SignUpData, useSignUp } from "@/hooks/auth/authApi";
import CryptoJS from "crypto-js";

const SignUp = () => {
  const { signUpApi } = useSignUp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [profile, setProfile] = useState("");

  const passwordChange = (newPassword: string) => {
    setPassword(newPassword);
  };

  const hashFunction = (password: string) => {
    const hash = CryptoJS.SHA256(password);
    return hash.toString(CryptoJS.enc.Hex);
  };

  const signUpFunc = async () => {
    const hashedPassword = await hashFunction(password);

    console.log(hashedPassword);

    const param: SignUpData = {
      email: email,
      password: hashedPassword,
      name: name,
      profile: profile,
    };
    signUpApi(param);
  };

  return (
    <>
      <div className="flex w-screen h-screen justify-evenly items-center">
        <div>
          <div>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일"
            />
            <PasswordInput value={password} onChange={passwordChange} />
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름"
            />
            <Input
              value={profile}
              onChange={(e) => setProfile(e.target.value)}
              placeholder="소개"
            />
            <Button onClick={signUpFunc}>회원가입</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
