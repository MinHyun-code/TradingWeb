import { Routes, Route } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import Home from "@/pages/Home";
import Login from "@/pages/auth/Login";
import Test from "@/pages/Test";
import SignUp from "@/pages/auth/SignUp";

function CommonRouter() {
  return (
    <Routes>
      {/* // <Route>의 element에 레이아웃을 넣어준다. */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/test" element={<Test />}></Route>
      </Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signUp" element={<SignUp />}></Route>
      {/* <Route element={<SubLayout />}>
        <Route path="/detail/:id" element={<Detail />}></Route>
        <Route path="/character/:id" element={<CharacterInfo />}></Route>
      </Route> 
      // TODO: 404 처리 필요*/}
      {/*<Route component={NotFound} />*/}
    </Routes>
  );
}

export default CommonRouter;
