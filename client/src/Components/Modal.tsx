import React from "react";

interface ModalProps {
  show: boolean;
  children?: React.ReactNode;
  closeModal: () => void;
}

export function Modal({ show, children, closeModal }: ModalProps) {
  let className: string | undefined;
  if (show) {
    className = "fade-in";
  }

  return (
    <div>
      <div className={className + " mask"} onClick={closeModal}></div>
      <div className={className + " modal"}>{children}</div>
    </div>
  );
}
