import React from 'react';
import { loginFunc, loginData } from '@/hooks/login/loginApi.ts';

const { loginProcess } = loginFunc();

const tempData: loginData = {
  email : 'chmin82@gmail.com',
  password : 'dc98e82fcfb4b165f5fa390d5ca61a9245a5be6ea70a4f00020ddff029afefba',
  authLogin : 'Y'
}

function loginTest() {
  loginProcess(tempData);
}

const Login = () => {
  return (
    <>
      <h1>Login</h1>
      <button onClick={loginTest}>Go to MyPage</button>
    </>
  );
};

export default Login;