import { useNavigate } from "react-router-dom";
import CoinListModal from "@/components/modal/CoinListModal";
import { useState } from "react";
import IdeaAddForm from "@/components/addForm/IdeaAddForm";

const Idea = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="flex flex-col"></div>
      <button
        onClick={openModal}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Open Modal
      </button>

      <CoinListModal isOpen={isModalOpen} onClose={closeModal}>
        <IdeaAddForm />
      </CoinListModal>
    </>
  );
};

export default Idea;
