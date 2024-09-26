import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  LoginData,
  useLogin,
  useCheckAuthEmail,
  useMailSend,
  useMailAuth,
  MailAuthData,
} from "@/hooks/auth/authApi";
import { useToast } from "@/hooks/use-toast";
import PasswordInput from "@/components/ui/passwordInput";
import CryptoJS from "crypto-js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // 계정 상태 값
  const [userStatus, setUserStatus] = useState("");
  // 인증번호
  const [authCode, setAuthCode] = useState("");

  const { toast } = useToast();

  const { checkAuthEmailApi } = useCheckAuthEmail();
  const { loginApi } = useLogin();
  const { mailSendApi } = useMailSend();
  const { mailAuthApi } = useMailAuth();

  const passwordChange = (newPassword: string) => {
    setPassword(newPassword);
  };

  // Enter Key 이벤트
  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (userStatus === "a") {
        login();
      } else if (userStatus === "na") {
        authEmail();
      } else {
        checkEmail();
      }
    }
  };

  // 이메일 상태 조회 API 호출
  const checkEmail = async () => {
    const isValid = await validationChk();
    if (!isValid) {
      return;
    }

    const result = await checkAuthEmailApi(email);

    // 존재하지 않는 이메일
    if (result === "ne") {
      toast({
        title: "",
        description: "존재하지 않는 이메일입니다.",
      });
      setUserStatus("ne");
    }
    // 인증되지 않은 이메일
    else if (result === "na") {
      setUserStatus("na");
    }
    // 인증된 이메일
    else if (result === "a") {
      setUserStatus("a");
    }
  };

  // Validation Check
  const validationChk = async () => {
    const EMAIL_REGEX = new RegExp(
      "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}"
    );
    if (!EMAIL_REGEX.test(email)) {
      toast({
        title: "",
        description: "이메일 주소를 정확히 입력해주세요.",
      });
      return false;
    }
    return true;
  };

  // 비밀번호 암호화 (SHA256)
  const hashFunction = (password: string) => {
    const hash = CryptoJS.SHA256(password);
    return hash.toString(CryptoJS.enc.Hex);
  };

  // 메일 인증 API 호출
  const authEmail = async () => {
    const param: MailAuthData = {
      email: email,
      code: authCode,
    };
    const result = await mailAuthApi(param);

    // 인증 성공
    if (result) {
      setUserStatus("a");
    }
  };

  // 메일 전송 API 호출
  const sendEmail = async () => {
    await mailSendApi(email);
  };

  // 로그인 API 호출
  const login = async () => {
    const hashedPassword = await hashFunction(password);

    const param: LoginData = {
      email: email,
      password: hashedPassword,
      authLogin: "Y",
    };
    loginApi(param);
  };

  return (
    <div className="flex w-screen h-screen justify-evenly p-5 items-center dark:bg-darkMode dark:text-white">
      <div className="lg:p-8 border border-slate-300 rounded-lg p-5 sm:w-[350px] min-w-80">
        <div className="text-2xl mb-16 font-semibold">XTrading</div>
        <div className="flex w-full flex-col justify-center space-y-6">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
            onKeyDown={handleEnterPress}
            disabled={userStatus === "a"}
          />
          {userStatus === "a" ? (
            <div className="text-xs text-slate-400 mt-3">
              <PasswordInput
                value={password}
                onChange={passwordChange}
                onKeyDown={handleEnterPress}
              />
              <Button className="mt-5 w-full" onClick={login}>
                로그인
              </Button>
            </div>
          ) : userStatus === "na" ? (
            <div>
              <Input
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value)}
                placeholder="인증번호"
                onKeyDown={handleEnterPress}
              />
              <Button className="mt-5 w-full" onClick={authEmail}>
                인증
              </Button>
            </div>
          ) : (
            <Button onClick={checkEmail}>다음</Button>
          )}
          <div className="mt-4">
            {/* <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse.credential);
                // Your Google login API call here
              }}
              onError={() => {
                console.error("Failed Login..");
              }}
              text="signin_with"
              theme="filled_blue"
            /> */}
          </div>
        </div>
        {userStatus === "na" ? (
          <div>
            <span className="text-xs text-slate-400">메일이 안왔나요?</span>
            <span
              className="text-xs font-semibold ml-2 cursor-pointer hover:underline"
              onClick={sendEmail}
            >
              재전송
            </span>
          </div>
        ) : userStatus === "a" ? (
          <div>
            <div>
              <span className="text-xs text-slate-400">
                비밀번호를 잊었나요?
              </span>
            </div>
          </div>
        ) : (
          <div>
            <span className="text-xs text-slate-400">
              계정 생성하시겠습니까?
            </span>
            <Link
              to="/signUp"
              className="text-xs font-semibold ml-2 cursor-pointer hover:underline"
            >
              회원가입
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
