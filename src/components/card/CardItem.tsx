import React, { useEffect, useState } from "react";
import { Item } from "@/hooks/news/NewsApi.ts"; // Assuming you have this type
import { Card } from "@/components/ui/card";

interface CardItemProps {
  item: Item;
}

const CardItem: React.FC<CardItemProps> = ({ item }) => {
  const fallbackImage = "https://via.placeholder.com/240";
  const [description, setDescription] = useState("");

  const currentPath = location.pathname;

  useEffect(() => {
    if (currentPath.includes("/cointelegraph")) {
      setDescription(item.description.replace(/<p[^>]*>/g, ""));
      setDescription(description.replace(/<img[^>]*>/g, ""));
    } else {
      setDescription(item.description);
    }
  }, [item]);

  return (
    <Card
      className="mb-5 transition-transform duration-300 hover:scale-103 dark:border-slate-300"
      onClick={() => window.open(item.link)}
    >
      <div className="flex flex-col sm:flex-row dark:bg-gray-900 dark:text-white rounded-xl">
        <div className="w-full sm:max-w-max h-44 overflow-hidden">
          <img
            className="object-fill w-full h-full rounded-t-xl sm:rounded-l-xl sm:rounded-r-none"
            src={item["media:content"]?.["@_url"] || fallbackImage}
            alt={item.title}
          />
        </div>
        <div className="p-4 flex flex-col justify-between">
          <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
          <p
            className="text-gray-700 dark:text-white"
            dangerouslySetInnerHTML={{ __html: description }}
          ></p>
        </div>
      </div>
    </Card>
  );
};

export default CardItem;
