import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCheckAuthEmail } from "@/hooks/auth/authApi";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const { checkAuthEmailApi } = useCheckAuthEmail();

  const checkEmail = async () => {
    const isValid = await validationChk();
    if (!isValid) {
      return;
    }

    const result = checkAuthEmailApi(email);
    console.log(result);
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

  return (
    <div className="flex w-screen h-screen justify-evenly p-5 items-center dark:bg-darkMode dark:text-white">
      <div className="lg:p-8 border border-slate-300 rounded-lg p-5 sm:w-[350px] min-w-80">
        <div className="text-2xl mb-16 font-semibold">XTrading</div>
        <div className="flex w-full flex-col justify-center space-y-6">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
          />
          <Button onClick={checkEmail}>다음</Button>
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
        <span className="text-xs text-slate-400">계정 생성하시겠습니까?</span>

        <Link
          to="/signUp"
          className="text-xs font-semibold ml-2 cursor-pointer hover:underline"
        >
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default Login;
