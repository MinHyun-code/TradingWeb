import Modal from "@/components/modal/Modal";
import { useState } from "react";
import FeedAdd from "@/components/modal/FeedAdd";

const Feed = () => {
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

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <FeedAdd />
      </Modal>
    </>
  );
};

export default Feed;
