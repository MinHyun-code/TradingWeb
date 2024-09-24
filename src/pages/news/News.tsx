import { useNewsList } from "@/hooks/news/NewsApi";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NewsCard from "@/components/card/NewsCard";
import LoadingSpinner from "@/components/LoadingSpinner";

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

  if (dataList?.rss.channel.item === undefined) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="flex flex-col">
        {displayedItems.length > 0 &&
          displayedItems.map((item, index) => (
            <NewsCard key={index} item={item} />
          ))}
      </div>
    </>
  );
};

export default News;
