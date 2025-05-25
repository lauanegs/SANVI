import React, { useRef } from "react";
import "./modal.css";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    const contentRef = useRef<HTMLDivElement>(null);

    if (!isOpen) return null;

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (
            contentRef.current &&
            !contentRef.current.contains(e.target as Node)
        ) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content" ref={contentRef}>
                <div className="modal-header">
                    <button className="modal-close" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="modal-body">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
