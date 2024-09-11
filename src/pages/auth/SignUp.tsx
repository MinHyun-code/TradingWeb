import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/common/PasswordInput";
import { SignUpData, useSignUp } from "@/hooks/auth/authApi";
import CryptoJS from "crypto-js";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const SignUp = () => {
  const { toast } = useToast();
  const { signUpApi } = useSignUp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordTemp, setPasswordTemp] = useState("");
  const [passwordCheck, setPasswordCheck] = useState<boolean>(false);
  const [name, setName] = useState("");

  const passwordChange = (newPassword: string) => {
    setPassword(newPassword);
  };

  const passwordTempChange = (newPassword: string) => {
    setPasswordTemp(newPassword);
  };

  // 비밀번호 암호화 (SHA256)
  const hashFunction = (password: string) => {
    const hash = CryptoJS.SHA256(password);
    return hash.toString(CryptoJS.enc.Hex);
  };

  // 회원가입 로직
  const signUpFunc = async () => {
    const isValid = await validationChk();
    if (!isValid) {
      return;
    }

    const hashedPassword = await hashFunction(password);

    const param: SignUpData = {
      email: email,
      password: hashedPassword,
      name: name,
    };
    signUpApi(param);
  };

  // Validation Check
  const validationChk = async () => {
    const EMAIL_REGEX = new RegExp(
      "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}"
    );
    const PASSWORD_REGEX = new RegExp(
      "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$"
    );

    if (!EMAIL_REGEX.test(email)) {
      toast({
        title: "",
        description: "이메일 주소를 정확히 입력해주세요.",
      });
      return false;
    }

    if (!PASSWORD_REGEX.test(password)) {
      toast({
        title:
          "비밀번호는 문자, 숫자, 특수 문자를 포함하여 최소 8자 이상이어야 합니다.",
        description: "There was a problem with your request.",
      });
      return false;
    }

    return true;
  };

  useEffect(() => {
    if (password === passwordTemp) {
      setPasswordCheck(true);
    } else {
      setPasswordCheck(false);
    }
  }, [passwordTemp]);

  return (
    <>
      <div className="flex w-screen h-screen justify-evenly p-5 items-center dark:bg-darkMode dark:text-white">
        <div className="lg:p-8 border border-slate-300 rounded-lg p-5 sm:w-[350px]">
          <div className="text-2xl mb-16 font-semibold">XTrading</div>
          <div className="flex w-full flex-col justify-center space-y-6">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일"
            />
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="닉네임"
            />
            <div className="text-xs text-slate-400 mt-3">
              <PasswordInput value={password} onChange={passwordChange} />
              영문,숫자,특수문자를 포함하여 최소 8자 이상
            </div>

            <div className="text-xs text-slate-400 mt-3">
              <PasswordInput
                value={passwordTemp}
                onChange={passwordTempChange}
              />
              {passwordTemp === "" ? (
                <span></span>
              ) : passwordCheck ? (
                <span className="text-blue-700">비밀번호가 일치합니다.</span>
              ) : (
                <span className="text-red-700">
                  비밀번호가 일치하지 않습니다.
                </span>
              )}
            </div>

            <div className="text-xs text-slate-400 mt-3">
              가입함으로써 귀하는 당사의 이용 약관 및 개인정보 처리 방침과 쿠키
              정책에 동의하게 됩니다.
            </div>
            <Button onClick={signUpFunc}>회원가입</Button>
          </div>
          <span className="text-xs text-slate-400 mt-3">
            이미 계정을 가지고 계신가요?
          </span>
          <Link
            to="/login"
            className="text-xs font-semibold ml-2 cursor-pointer hover:underline"
          >
            로그인
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUp;
