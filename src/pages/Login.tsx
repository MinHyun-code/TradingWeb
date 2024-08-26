import React from "react";
import { login, loginData } from "@/hooks/login/LoginApi";
import { Box, Button, Center, Input } from "@chakra-ui/react";
import PasswordInput from "@/components/common/PasswordInput";

const { loginApi } = login();

const tempData: loginData = {
  email: "chmin82@gmail.com",
  password: "dc98e82fcfb4b165f5fa390d5ca61a9245a5be6ea70a4f00020ddff029afefba",
  authLogin: "Y",
};

function loginFunc() {
  loginApi(tempData);
}

const Login = () => {
  return (
    <>
      <Center>
        <Box maxW="sm" p={4}>
          <Input placeholder="Address" />
          <PasswordInput />
          <Button colorScheme="teal" variant="solid" onClick={loginFunc}>
            로그인
          </Button>
        </Box>
      </Center>
    </>
  );
};

export default Login;
