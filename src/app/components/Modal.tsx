"use client"

type ModalProps = {
    open : boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal({ open, onClose, children }: ModalProps) {
    if(!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-black">
                </button>
                {children}
            </div>
        </div>
    )
}