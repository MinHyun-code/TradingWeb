import React, { useEffect, useState } from "react";
import { Item } from "@/hooks/news/NewsApi.ts"; // Assuming you have this type

interface CardItemProps {
  item: Item;
}

const CardItem: React.FC<CardItemProps> = ({ item }) => {
  const fallbackImage = "https://via.placeholder.com/200";
  const [description, setDescription] = useState("");

  const currentPath = location.pathname;

  useEffect(() => {
    if (currentPath.includes("/cointelegraph")) {
      setDescription(item.description.replace(/<img[^>]*>/g, ""));
    } else {
      setDescription(item.description);
    }
  }, [item]);

  return (
    <div
      className="cursor-pointer overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
      onClick={() => window.open(item.link)}
    >
      <div className="flex flex-col sm:flex-row bg-white border border-gray-200 rounded-lg shadow-md ">
        <img
          className="object-cover w-full sm:w-48 h-48"
          src={item["media:content"]?.["@_url"] || fallbackImage}
          alt={item.title}
        />
        <div className="p-4 flex flex-col justify-between dark:bg-gray-900 dark:text-white">
          <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
          <p
            className="text-gray-700 dark:text-white"
            dangerouslySetInnerHTML={{ __html: description }}
          ></p>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
