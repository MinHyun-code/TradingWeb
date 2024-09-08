import Main from "@/components/Main";
import Header from "@/components/Header";
import React from "react";

function MainLayout() {
  return (
    <div className="dark:bg-darkMode h-screen">
      <Header></Header>
      <Main></Main>
    </div>
  );
}

export default MainLayout;
