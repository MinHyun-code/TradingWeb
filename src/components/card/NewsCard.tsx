import React, { useEffect, useState } from "react";
import { Item } from "@/hooks/news/NewsApi.ts"; // Assuming you have this type
import { Card } from "@/components/ui/card";

interface CardItemProps {
  item: Item;
}

const NewsCard: React.FC<CardItemProps> = ({ item }) => {
  const fallbackImage = "/no-image.png";
  const [description, setDescription] = useState("");

  const currentPath = location.pathname;

  useEffect(() => {
    if (currentPath.includes("/cointelegraph")) {
      setDescription(item.description.replace("<p>", ""));
      setDescription(item.description.replace("</p>", ""));
      setDescription(
        item.description.replace(/<img[^>]*>/g, "").replace(/<p[^>]*>/g, "")
      );
    } else {
      setDescription(item.description);
    }
  }, [item]);

  return (
    <Card
      className="mb-5 transition-transform duration-300 hover:scale-101 dark:border-slate-300"
      onClick={() => window.open(item.link)}
    >
      <div className="flex flex-col sm:flex-row dark:bg-darkMode dark:text-white rounded-xl">
        <div className="flex w-full sm:w-48 justify-center">
          <div className="w-full sm:w-52 h-32 overflow-hidden">
            <img
              className="object-fill w-full h-full rounded-xl"
              src={item["media:content"]?.["@_url"] || fallbackImage}
              alt={item.title}
            />
          </div>
        </div>
        <div className="p-4 flex flex-col justify-between">
          <p className="text-lg font-semibold mb-2 text-left text-lg">
            {item.title}
          </p>
          <p
            className="text-gray-700 dark:text-white text-left text-sm"
            dangerouslySetInnerHTML={{ __html: description }}
          ></p>
        </div>
      </div>
    </Card>
  );
};

export default NewsCard;
