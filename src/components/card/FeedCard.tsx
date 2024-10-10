import React, { useState } from "react";
import { feedData } from "@/hooks/idea/feedApi";
import { Card } from "@/components/ui/card";
import ProfileImage from "@/components/ui/profileImg";
import EllipsisText from "../ui/ellipsisText";
import DateDisplay from "../ui/dateDisplay";
import { useIdeaLikeToggle } from "@/hooks/idea/ideaApi";
// import { useFollow, FollowReq } from "@/hooks/mypage/mypageApi";

interface CardItemProps {
  item: feedData;
}

const IdeaCard: React.FC<CardItemProps> = ({ item }) => {
  const { ideaLikeToggleApi } = useIdeaLikeToggle();
  // const { followApi } = useFollow();
  const [liked, setLiked] = useState(item.youLike);
  const [likeCount, setLikeCount] = useState(item.likeCount);

  const likeToggle = async () => {
    const result = await ideaLikeToggleApi(item.feedId);

    if (result) {
      console.log(likeCount);
      setLiked((prevLiked) => {
        // liked 상태에 따라 likeCount를 조정
        const newLiked = !prevLiked;
        setLikeCount(() => (newLiked ? likeCount + 1 : likeCount - 1));
        return newLiked;
      });
    }
  };

  // const followAction = () => {
  //   const param: FollowReq = {
  //     targetId: item.cretId,
  //   };
  //   followApi(param);
  // };

  // TODO: 팔로우 기능 추가 확인 (만약 추가 시, 목록 조회 API에서 팔로우 여부 가져와야함)

  return (
    <Card className="dark:border-slate-300 w-full rounded-none border-t-0 border-l-0 border-r-0 shadow-none bg-transparent">
      <div className="flex flex-col dark:bg-darkMode dark:text-white">
        <div className="p-4 flex flex-col justify-between text-left">
          <div className="mb-5 font-semibold flex items-center justify-between">
            <div className="flex items-center">
              <div className="cursor-pointer flex items-center">
                <ProfileImage />
                <span className="ml-3">{item.createdByName}</span>
              </div>
              <span className="p-1 ml-1 text-sm text-blue-500">
                {item.createdByUserGrade}
              </span>
              <span className="text-xs ml-1 text-slate-400 font-medium">
                <DateDisplay isoString={item.createdDatetime}></DateDisplay>
              </span>
            </div>
            {/* <button
              className="bg-yellow-400 rounded-lg font-semibold p-1.5 text-xs text-black"
              onClick={followAction}
            >
              follow
            </button> */}
          </div>
          <div className="cursor-pointer sm:mr-10 sm:ml-10">
            <div className="font-semibold mb-7 tracking-wide">
              {item.subject}
            </div>
            <div className="mb-7 text-slate-500 dark:text-slate-300">
              <EllipsisText text={item.contents} maxLines={10}></EllipsisText>
            </div>
          </div>
          <div className="text-yellow-500 font-semibold flex">
            {item.tagList.length > 0 &&
              item.tagList.map((tag, index) => (
                <div className="rounded-lg p-1 mr-3 text-sm" key={index}>
                  #{tag}
                </div>
              ))}
          </div>
          <div className="flex mt-3 text-xs text-slate-400 font-semibold">
            <div className="mr-3 flex items-center">
              <img
                src="/images/icons8-view.png"
                alt="viewCount"
                className="w-5 mr-1"
              />
              <span>{item.viewCount}</span>
            </div>
            <div className="mr-3 flex items-center">
              <img
                src="/images/icons8-comment.png"
                alt="commentCount"
                className="w-5 mr-1"
              />
              <span>{item.commentCount}</span>
            </div>
            <div className="flex items-center">
              {liked ? (
                <img
                  src="/images/icons8-like-on.png"
                  alt="like"
                  className="w-5 mr-1 cursor-pointer"
                  onClick={() => likeToggle()}
                />
              ) : (
                <img
                  src="/images/icons8-like-off.png"
                  alt="like"
                  className="w-5 mr-1 cursor-pointer"
                  onClick={() => likeToggle()}
                />
              )}
              <span>{likeCount}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default IdeaCard;
