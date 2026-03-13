"use client"

import {ModalMode} from "luksal/app/components/Modal";
import {BookBasicInfoDetailsDto} from "luksal/app/types/bookBasicInfo";
import React from "react";

type Props = {
    selected: BookBasicInfoDetailsDto;
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


export default function BookBasicInfoDetailsView({ selected, mode }: Props) {
    const isReadOnly = ModalMode.isReadOnly(mode);

    const [form, setForm] = React.useState<BookBasicInfoDetailsDto>(selected);


    React.useEffect(() => {
        setForm(selected);
    }, [selected]);

    return (
        <div className="grid gap-4 items-start w-full">
            <section className={`${cardClass}`}>
                <h6 className={cardTitleClass}>Details</h6>

                <div className="space-y-3">
                    <label className={fieldRowClass}>
                        <span className={labelClass}>Id</span>
                        <input
                            className={isReadOnly ? readOnlyInputClass : editableInputClass}
                            name="id"
                            required
                            value={form.id}
                            readOnly={isReadOnly}
                        />
                    </label>

                    <label className={fieldRowClass}>
                        <span className={labelClass}>Book Id</span>
                        <input
                            className={isReadOnly ? readOnlyInputClass : editableInputClass}
                            name="bookId"
                            required
                            value={form.bookId}
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
                        <span className={labelClass}>Start Year</span>
                        <input
                            type="number"
                            className={isReadOnly ? readOnlyInputClass : editableInputClass}
                            name="firstPublishDate"
                            required
                            value={form.firstPublishDate}
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
                            rows={4}
                        />
                    </label>

                    <label className={fieldRowClass}>
                        <span className={labelClass}>Published Year</span>
                        <input
                            type="number"
                            className={isReadOnly ? readOnlyInputClass : editableInputClass}
                            name="publishedYear"
                            value={form.publishedYear || ""}
                            readOnly={isReadOnly}
                        />
                    </label>

                </div>
            </section>

        </div>
    );
}