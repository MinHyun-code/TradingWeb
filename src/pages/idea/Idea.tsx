import Modal from "@/components/modal/Modal";
import { useEffect, useState } from "react";
import IdeaAdd from "@/components/modal/IdeaAdd";
import { Button } from "@/components/ui/button";
import { useIdeaList } from "@/hooks/idea/ideaApi";
import { useFeedList } from "@/hooks/idea/feedApi";
import IdeaCard from "@/components/card/IdeaCard";
import FeedCard from "@/components/card/FeedCard";
import { Input } from "@/components/ui/input";
import LeftNavbar from "@/components/navbar/LeftNavbar";
import { useParams } from "react-router-dom";

const Idea = () => {
  const { ideaListApi, ideaList } = useIdeaList();
  const { feedListApi, feedList } = useFeedList();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams<{ id: string }>();

  type searchReq = {
    page: number;
    pageSize: number;
    code?: string;
    type?: string;
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    // idea 조회
    if (id === undefined) {
      const testParam: searchReq = {
        page: 1,
        pageSize: 20,
      };
      ideaListApi(testParam);
    } 
    // feed 조회
    else if (id === "feed") {
      const test2Param: searchReq = {
        page: 1,
        pageSize: 20,
        type: "COIN",
        code: "Btc",
      };
      feedListApi(test2Param);
    }
    // idea, feed 상세 조회
    else if (id === "post") {
      const test2Param: searchReq = {
        page: 1,
        pageSize: 20,
        type: "COIN",
        code: "Btc",
      };
      feedListApi(test2Param);
    }
  }, [id]);

  return (
    <>
      <div className="flex flex-col items-center mt-10">
        <div className="sm:w-[1300px] min-w-80 rounded-lg">
          <div className="flex">
            <div className="sm:w-3/12 sm:flex hidden sm:block mr-3 flex-row-reverse">
              <div className="w-10/12">
                <LeftNavbar />
              </div>
            </div>
            <div className="sm:w-6/12 w-screen border sm:rounded-2xl min-h-screen">
              <div className="pt-3">
              {id === undefined &&
                ideaList &&
                ideaList.length > 0 &&
                ideaList.map((item, index) => (
                  <IdeaCard key={index} item={item} />
                ))}

              {id === "feed" &&
                feedList &&
                feedList.length > 0 &&
                feedList.map((item, index) => (
                  <FeedCard key={index} item={item} />
                ))}
              </div>
            </div>
            <div className="sm:w-3/12 hidden sm:block ml-3">
              <div>
                <Input placeholder="search..." />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Button onClick={openModal} variant="outline" className="w-full mb-10">
        <span className="dark:text-white">작성</span>
      </Button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <IdeaAdd />
      </Modal>
    </>
  );
};

export default Idea;
