import React from "react";
import Main from "@/components/Main";
import Header from "@/components/Header";
import LeftSideBar from "@/components/LeftSideBar";

const LeftSideLayout: React.FC = () => {
  return (
    <div className="dark:bg-darkMode">
      <Header />
      <div className="flex justify-evenly">
        <main className="flex flex-col mt-4 container w-screen md:w-10/12">
          <LeftSideBar />
          <Main />
        </main>
      </div>
    </div>
  );
};

export default LeftSideLayout;
