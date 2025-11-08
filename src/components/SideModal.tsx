import type React from "react";

interface SideModalProps{
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children?:React.ReactNode;
}

export function SideModal({isOpen, onClose, title, children}: SideModalProps) {
  return (
    <div>
        <div className={`fixed inset-0 bg-black/20 backdrop-blur-xs z-40 ${isOpen? "opacity-100" : "opacity-0 invisible"}`}
        onClick={onClose}/>
        <div className={`fixed top-0 right-0 h-full w-9/10 md:w-96 bg-card-background border-l border-border shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
            <div className="flex justify-between items-center p-5 border-b border-border">
                <h2 className="text-xl font-semibold">{title}</h2>
                <button onClick={onClose} className="cursor-pointer">
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div className="p-5 overflow-y-auto">{children}</div>
        </div>
    </div>
  )
}

export default SideModal