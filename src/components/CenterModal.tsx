import type React from "react";

interface CenterModalProps {
    isOpen?: boolean;
    onClose: () => void;
    title?: string;
    children?: React.ReactNode;
}

export function CenterModal({isOpen, onClose, title, children}: CenterModalProps) {
  return (
    <div>
        {isOpen && (
        <>
            <div
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-xs z-40"
            />
            <div
            className="
                fixed top-1/2 left-1/2 
                transform -translate-x-1/2 -translate-y-1/2
                bg-card-background border border-border shadow-lg rounded-lg
                w-[90%] md:w-[500px] p-6 z-50
                transition-all duration-300
            "
            >
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{title}</h2>
                <button onClick={onClose}>
                <i className="fa-solid fa-xmark hover:gradient-dynamic cursor-pointer p-1 rounded-lg transition duration-200"></i>
                </button>
            </div>
            {children}
            </div>
        </>
        )}
    </div>
  )
}

export default CenterModal