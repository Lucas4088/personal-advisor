"use client"

import {ModalMode} from "luksal/app/components/Modal";
import {BookDetailsDto} from "luksal/app/types/book";
import React from "react";

type Props = {
    selected: BookDetailsDto;
    mode: ModalMode;
}

const fieldRowClass = "flex flex-col gap-1";
const labelClass = "text-sm text-gray-700";
const readOnlyInputClass =
    "w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 shadow-sm";
const editableInputClass =
    "w-full rounded-md border border-gray-300 bg-white-600 px-3 py-2 text-sm text-gray-900 shadow-sm ";
const cardClass =
    "bg-white p-5 w-full rounded-lg border border-gray-200 shadow-sm";
const cardTitleClass =
    "mb-4 text-sm font-semibold text-gray-900 text-center";


export default function BookDetailsView({ selected, mode }: Props) {
    const isReadOnly = ModalMode.isReadOnly(mode);

    const [form, setForm] = React.useState<BookDetailsDto>(selected);

    React.useEffect(() => {
        setForm(selected);
    }, [selected]);

    return (
        <div className="grid grid-cols-2 gap-4 items-start w-full">
            <section className={`${cardClass}`}>
                <h6 className={cardTitleClass}>Details</h6>

                <div className="space-y-3">
                    <label className={fieldRowClass}>
                        <span className={labelClass}>Book Id</span>
                        <input
                            className={isReadOnly ? readOnlyInputClass : editableInputClass}
                            name="bookId"
                            value={form.bookId || ""}
                            readOnly={isReadOnly}
                        />
                    </label>

                    <label className={fieldRowClass}>
                        <span className={labelClass}>Title</span>
                        <input
                            className={isReadOnly ? readOnlyInputClass : editableInputClass}
                            name="title"
                            required
                            value={form.title}
                            readOnly={isReadOnly}
                        />
                    </label>

                    <label className={fieldRowClass}>
                        <span className={labelClass}>Published Year</span>
                        <input
                            type="number"
                            className={isReadOnly ? readOnlyInputClass : editableInputClass}
                            name="publishedYear"
                            required
                            value={form.publishedYear}
                            readOnly={isReadOnly}
                        />
                    </label>

                    <label className={fieldRowClass}>
                        <span className={labelClass}>Publishing Year</span>
                        <input
                            type="number"
                            className={isReadOnly ? readOnlyInputClass : editableInputClass}
                            name="publishingYear"
                            required
                            value={form.publishingYear}
                            readOnly={isReadOnly}
                        />
                    </label>

                    <label className={fieldRowClass}>
                        <span className={labelClass}>Page Count</span>
                        <input
                            type="number"
                            className={isReadOnly ? readOnlyInputClass : editableInputClass}
                            name="pageCount"
                            value={form.pageCount || ""}
                            readOnly={isReadOnly}
                        />
                    </label>
                    
                     <label className={fieldRowClass}>
                        <span className={labelClass}>Description</span>
                        <textarea
                            className={isReadOnly ? readOnlyInputClass : editableInputClass}
                            name="description"
                            value={form.description || ""}
                            readOnly={isReadOnly}
                            rows={6}
                        />
                    </label>
                </div>
            </section>
            
            <section className={`${cardClass}`}>
                 <h6 className={cardTitleClass}>Thumbnails</h6>
                 <div className="space-y-3">
                    <label className={fieldRowClass}>
                        <span className={labelClass}>Thumbnail URL</span>
                        <input
                            className={isReadOnly ? readOnlyInputClass : editableInputClass}
                            name="thumbnailUrl"
                            value={form.thumbnailUrl || ""}
                            readOnly={isReadOnly}
                        />
                    </label>
                    <label className={fieldRowClass}>
                        <span className={labelClass}>Small Thumbnail URL</span>
                        <input
                            className={isReadOnly ? readOnlyInputClass : editableInputClass}
                            name="smallThumbnailUrl"
                            value={form.smallThumbnailUrl || ""}
                            readOnly={isReadOnly}
                        />
                    </label>
                    {form.smallThumbnailUrl && <img src={form.smallThumbnailUrl} alt="Small Thumbnail" className="mt-2 w-full h-auto rounded-md"/>}
                 </div>
            </section>

        </div>
    );
}