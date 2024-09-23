import Modal from "@/components/modal/Modal";
import { useState } from "react";
import IdeaAdd from "@/components/modal/IdeaAdd";
import { Button } from "@/components/ui/button";
import { useIdeaList, boardListReq } from "@/hooks/idea/ideaApi";

const Idea = () => {
  const { IdeaListApi } = useIdeaList();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const testParam: boardListReq = {
    page: 1,
    pageSize: 20,
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="flex flex-col items-center mt-10">
        <div className="sm:w-[1000px] min-w-80 border border-slate-300 rounded-lg">
          <Button onClick={openModal} variant="outline" className="w-full">
            <span className="dark:text-white">작성</span>
          </Button>
        </div>
        <Button
          onClick={IdeaListApi(testParam)}
          variant="outline"
          className="w-full"
        >
          <span className="dark:text-white">test</span>
        </Button>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <IdeaAdd />
      </Modal>
    </>
  );
};

export default Idea;
