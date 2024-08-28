import React, { useState } from "react";
import { Box, Button, Center, Flex, Input } from "@chakra-ui/react";
import PasswordInput from "@/components/common/PasswordInput";
import { SignUpData, useSignUp } from "@/hooks/auth/authApi";

const SignUp = () => {
  const { signUpApi } = useSignUp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [profile, setProfile] = useState("");

  const passwordChange = (newPassword: string) => {
    setPassword(newPassword);
  };

  const signUpFunc = () => {
    const param: SignUpData = {
      email: email,
      password: password,
      name: name,
      profile: profile,
    };
    signUpApi(param);
  };

  return (
    <>
      <Flex align="center" justify="center" h="100vh" w="100vw">
        <Center>
          <Box maxW="sm" p={4}>
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
            <Button colorScheme="teal" variant="solid" onClick={signUpFunc}>
              회원가입
            </Button>
          </Box>
        </Center>
      </Flex>
    </>
  );
};

export default SignUp;
