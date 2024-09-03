import React, { useEffect, useState } from "react";
import { Item } from "@/hooks/news/NewsApi.ts";
import { Card, CardBody, Image, Stack, Heading, Text } from "@chakra-ui/react";

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
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      height={{ base: "100%", sm: "150px" }}
      onClick={() => window.open(item.link)}
      transition="all 0.3s ease" // 호버 효과 전환을 부드럽게 하기 위한 설정
      _hover={{
        boxShadow: "xl", // 호버 시 그림자 효과 추가
        transform: "scale(1.01)", // 호버 시 크기 확대
        cursor: "pointer",
      }}
    >
      <Image
        objectFit="fill"
        minW="200px"
        maxW={{ base: "100%", sm: "200px" }} // 화면 크기에 따라 최대 너비 설정
        maxH="200px" // 최대 높이 설정
        src={item["media:content"]?.["@_url"] || fallbackImage}
      />
      <Stack w="100%">
        <CardBody>
          <Heading size="md">{item.title}</Heading>
          <Text py="2" dangerouslySetInnerHTML={{ __html: description }}></Text>
        </CardBody>
      </Stack>
    </Card>
  );
};

export default CardItem;
