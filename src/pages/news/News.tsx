import { useNewsList } from "@/hooks/news/NewsApi";
import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CardItem from "@/components/card/CardItem";

const News = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { newsListApi, dataList } = useNewsList();

  useEffect(() => {
    if (id === undefined) {
      navigate("/news/mk");
    } else {
      newsListApi("/" + id + "-api");
    }
  }, [id]);

  const items = dataList?.rss.channel.item ?? [];

  // 최대 표시할 항목 수
  const MAX_ITEMS = 30;

  // 30개까지만 슬라이스
  const displayedItems = items.slice(0, MAX_ITEMS);

  if (!Array.isArray(dataList?.rss.channel.item)) {
    return <p>No data available</p>; // 데이터가 없을 때의 메시지
  }

  return (
    <>
      <Flex direction="column" gap={4}>
        {displayedItems.length > 0 ? (
          displayedItems.map((item, index) => (
            <CardItem key={index} item={item} />
          ))
        ) : (
          <p>No news items</p>
        )}
      </Flex>
    </>
  );
};

export default News;
