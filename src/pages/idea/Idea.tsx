import Modal from "@/components/modal/Modal";
import { useEffect, useState } from "react";
import IdeaAdd from "@/components/modal/IdeaAdd";
import { Button } from "@/components/ui/button";
import { useIdeaList, boardListReq } from "@/hooks/idea/ideaApi";
import LoadingSpinner from "@/components/LoadingSpinner";
import IdeaCard from "@/components/card/IdeaCard";

const Idea = () => {
  const { ideaListApi, dataList } = useIdeaList();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const testParam: boardListReq = {
    page: 1,
    pageSize: 20,
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    ideaListApi(testParam);
  }, []);

  if (dataList === undefined) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="flex flex-col items-center mt-10">
        <div className="sm:w-[1300px] min-w-80 rounded-lg">
          <Button
            onClick={openModal}
            variant="outline"
            className="w-full mb-10"
          >
            <span className="dark:text-white">작성</span>
          </Button>
          <div className="flex">
            <div className="sm:w-3/12 border hidden sm:block rounded-lg mr-3">
              <div className="">Following</div>
            </div>
            <div className="sm:w-6/12 border rounded-lg">
              {dataList.length > 0 &&
                dataList.map((item, index) => (
                  <IdeaCard key={index} item={item} />
                ))}
            </div>
            <div className="sm:w-3/12 border hidden sm:block rounded-lg  ml-3">
              <div className="">Following</div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <IdeaAdd />
      </Modal>
    </>
  );
};

export default Idea;
