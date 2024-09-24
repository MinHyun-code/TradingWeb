import React from "react";
import { boardData } from "@/hooks/idea/ideaApi";
import { Card } from "@/components/ui/card";

interface CardItemProps {
  item: boardData;
}

const IdeaCard: React.FC<CardItemProps> = ({ item }) => {
  return (
    <Card
      className="dark:border-slate-300 w-full rounded-none cursor-pointer border-t-0 border-l-0 border-r-0 shadow-none bg-transparent"
      onClick={() => window.open()}
    >
      <div className="flex flex-col dark:bg-darkMode dark:text-white">
        <div className="p-4 flex flex-col justify-between text-left">
          <div className="text-lg font-semibold mb-7 tracking-wide">
            {item.subject}
          </div>
          <div className="text-slate-400 mb-7">{item.contents}</div>
          <div className="mb-5 font-semibold">
            {item.cretName}
            <span className="bg-yellow-400 rounded-lg p-1 border-slate-400 border ml-3 text-sm text-blue-500">
              {item.cretUserGrade}
            </span>
          </div>
          <div className="text-purple-800 font-semibold flex">
            {item.tagList.length > 0 &&
              item.tagList.map((tag, index) => (
                <div
                  className="bg-yellow-400 rounded-lg p-1 border-slate-400 border mr-3 text-sm"
                  key={index}
                >
                  #{tag}
                </div>
              ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default IdeaCard;
