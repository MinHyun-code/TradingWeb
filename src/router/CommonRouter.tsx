import { Routes, Route } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import Home from "@/pages/Home";
import Login from "@/pages/auth/Login";
import SignUp from "@/pages/auth/SignUp";
import Idea from "@/pages/idea/Idea";
import News from "@/pages/news/News";
import Interest from "@/pages/interest/Interest";
import Market from "@/pages/market/market";

function CommonRouter() {
  return (
    <Routes>
      {/* // <Route>의 element에 레이아웃을 넣어준다. */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/idea" element={<Idea />}></Route>
        <Route path="/news" element={<News />}></Route>
        <Route path="/interest" element={<Interest />}></Route>
        <Route path="/market" element={<Market />}></Route>
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
