"use client"
import {IoMdClose} from "react-icons/io";

export enum ModalMode {
    Create = "create",
    View = "view",
    Edit = "edit",
    Delete = "delete",
}

export namespace ModalMode {
    export function title(mode: ModalMode): string {
        switch (mode) {
            case ModalMode.Create:
                return "Create";
            case ModalMode.View:
                return "View";
            case ModalMode.Edit:
                return "Edit";
            case ModalMode.Delete:
                return "Delete";
            default:
                9
                return mode;
        }
    }

    export function canSave(mode: ModalMode): boolean {
        return mode === ModalMode.Create || mode === ModalMode.Edit;
    }

    export function isReadOnly(mode: ModalMode): boolean {
        return mode === ModalMode.View || mode === ModalMode.Delete;
    }

    export function isEdit(mode: ModalMode): boolean {
        return mode === ModalMode.Edit;
    }

    export function isDelete(mode: ModalMode): boolean {
        return mode === ModalMode.Delete;
    }
}

type ModalProps = {
    open: boolean;
    mode: ModalMode;
    onClose: () => void;
    id?: string | number;
    children: React.ReactNode;
}

export default function Modal({open, onClose, id, mode, children}: ModalProps) {
    if (!open) return null;

    if (ModalMode.isDelete(mode)) {
        children = (
            <div className="mx-4 mb-2 p-3 bg-red-50 text-red-700 rounded">
                Are you sure you want to delete this item? This action cannot be undone.
            </div>
        )
    }
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-lg p-3 w-full max-w-5xl relative">
                <div className="flex items-center justify-between px-1 py-1 mx-3  border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">{ModalMode.title(mode)} - Id : {id}</h2>
                    <div/>
                        <button
                            onClick={onClose}
                            aria-label="Close"
                            className="text-gray-500 hover:text-black hover:bg-gray-200 rounded-full p-2 transition-colors"
                            type="button"
                        >
                            <IoMdClose className="h-6 w-6"></IoMdClose>
                        </button>
                    </div>

                <div className="m-4 border-b pb-4 border-gray-200">
                    {children}
                </div>
                <div className="flex justify-end mx-4 mb-2">
                    {ModalMode.canSave(mode) && (
                        <button className="bg-emerald-900 text-white hover:bg-emerald-700  rounded-sm px-4 py-2">
                            Save
                        </button>
                    )}
                    {ModalMode.isDelete(mode) && (
                        <button className="bg-red-600 text-white hover:bg-red-500/50 hover:text-gray-600 rounded-sm px-4 py-2">
                            Confirm
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}