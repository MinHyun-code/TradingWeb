import React, { FormEvent, useState } from "react";
import { useLogin, LoginData, useLoginGoogle } from "@/hooks/auth/authApi";
import {
  Box,
  Button,
  Flex,
  Input,
  Link as ChakraLink,
  useColorMode,
} from "@chakra-ui/react";
import PasswordInput from "@/components/common/PasswordInput";
import { GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";

const Login = () => {
  const { loginApi } = useLogin();
  const { loginGoogleApi } = useLoginGoogle();
  const { colorMode } = useColorMode();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginFunc = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const param: LoginData = {
      email: email,
      password: password,
      authLogin: "Y",
    };
    loginApi(param);
  };

  const passwordChange = (newPassword: string) => {
    setPassword(newPassword);
  };

  return (
    <>
      <Flex align="center" justify="center" h="100vh" w="100vw">
        <Box maxW="sm" p={4}>
          <form onSubmit={loginFunc}>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일"
            />
            <PasswordInput value={password} onChange={passwordChange} />
            <Button
              type="submit"
              colorScheme="teal"
              variant="solid"
              mt={5}
              w="100%"
            >
              로그인
            </Button>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                loginGoogleApi(credentialResponse.credential);
              }}
              onError={() => {
                console.error("Failed Login..");
              }}
              text="signin_with"
              theme={colorMode === "dark" ? "filled_black" : "filled_blue"}
            />
            <ChakraLink
              as={Link}
              to="/signUp"
              sx={{ color: colorMode === "dark" ? "white" : "black" }}
            >
              Create Account
            </ChakraLink>
          </form>
        </Box>
      </Flex>
    </>
  );
};

export default Login;
