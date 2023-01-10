import React, { FC } from 'react';
import './MyModal.css';

interface ModalProps {
  children?: React.ReactNode;
  closeModal: Function;
}

const MyModal: FC<ModalProps> = ({ children, closeModal }) => {
  return (
    <div
      className="modal_container"
      onClick={(e) => {
        closeModal();
        e.stopPropagation();
      }}
    >
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default MyModal;
