import React from "react";
import Main from "@/components/Main";
import Header from "@/components/Header";
import LeftSideBar from "@/components/LeftSideBar";

const LeftSideLayout: React.FC = () => {
  return (
    <div className="dark:bg-gray-900">
      <Header />
      <main className="flex flex-col md:flex-row mx-auto mt-4 container mx-auto">
        <LeftSideBar />
        <Main />
      </main>
    </div>
  );
};

export default LeftSideLayout;
