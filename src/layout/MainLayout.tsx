import Header from "@/components/Header";
import React from "react";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <Header></Header>
      <Outlet />
    </>
  );
}

export default MainLayout;
