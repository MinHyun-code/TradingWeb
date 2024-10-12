import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/auth/Login";
import SignUp from "@/pages/auth/SignUp";
import Idea from "@/pages/idea/Idea";
import News from "@/pages/news/News";
import Interest from "@/pages/interest/Interest";
import Market from "@/pages/market/Market";
import ChartView from "@/pages/market/ChartView";
import Test from "@/pages/test";

import MainLayout from "@/layout/MainLayout";
import NewsLayout from "@/layout/NewsLayout";

import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./AuthContext";

function CommonRouter() {
  return (
    <AuthProvider>
      <Routes>
        {/* // <Route>의 element에 레이아웃을 넣어준다. */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/interest" element={<Interest />}></Route>
          <Route path="/market" element={<Market />}></Route>
          <Route path="/chart" element={<ChartView />}></Route>
          <Route path="/idea" element={<Idea />}></Route>
          <Route path="/idea/:id" element={<Idea />}></Route>
          <Route path="/idea/:id/:item" element={<Idea />}></Route>
          <Route
            path="/test"
            element={<PrivateRoute element={<Test />} />}
          ></Route>
        </Route>
        <Route element={<NewsLayout />}>
          <Route path="/news" element={<News />}></Route>
          <Route path="/news/:id" element={<News />}></Route>
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
    </AuthProvider>
  );
}

export default CommonRouter;
