import React, { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  searchBar?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "unset"; // 또는 'auto'
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle clicks on the background to close the modal
  const handleBackgroundClick = (e: React.MouseEvent) => {
    // Prevent the modal from closing when clicking inside the modal content
    e.stopPropagation();
    onClose();
  };

  // Handle clicks inside the modal content to prevent closing
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackgroundClick}
    >
      <div
        className="bg-white dark:bg-darkMode sm:pr-6 sm:pl-6 pl-2 rounded-lg shadow-lg max-w-2xl w-full relative max-h-screen overflow-auto"
        onClick={handleContentClick}
      >
        <button
          onClick={onClose}
          className="sm:hidden absolute top-0 right-2 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
