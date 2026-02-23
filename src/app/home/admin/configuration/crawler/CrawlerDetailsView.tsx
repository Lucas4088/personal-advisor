"use client"

import React from "react";
import { CrawlerSetting } from "luksal/app/types/crawler";
import {ModalMode} from "luksal/app/components/Modal";

type Props = {
    selected: CrawlerSetting;
    mode: ModalMode;
}

const fieldRowClass = "flex flex-col gap-1";
const labelClass = "text-sm text-gray-700";
const readOnlyInputClass =
    "w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 shadow-sm";
const editableInputClass =
    "w-full rounded-md border border-gray-300 bg-white-600 px-3 py-2 text-sm text-gray-900 shadow-sm";
const cardClass =
    "bg-white p-5 w-full rounded-lg border border-gray-200 shadow-sm";
const cardTitleClass =
    "mb-4 text-sm font-semibold text-gray-900 text-center";
const checkboxClass =
    "h-4 w-4 rounded border border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 disabled:opacity-60";

export default function CrawlerDetailsView({ selected, mode }: Props) {
    const isReadOnly = ModalMode.isReadOnly(mode);

    const [form, setForm] = React.useState<CrawlerSetting>(selected);

    React.useEffect(() => {
        setForm(selected);
    }, [selected]);

    const update = <K extends keyof CrawlerSetting>(key: K, value: CrawlerSetting[K]) => {
        if (isReadOnly) return;
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const updatePath = <K extends keyof CrawlerSetting["path"]>(
        key: K,
        value: CrawlerSetting["path"][K],
    ) => {
        if (isReadOnly) return;
        setForm((prev) => ({ ...prev, path: { ...prev.path, [key]: value } }));
    };

    const updateRateLimit = <K extends keyof CrawlerSetting["rateLimit"]>(
        key: K,
        value: CrawlerSetting["rateLimit"][K],
    ) => {
        if (isReadOnly) return;
        setForm((prev) => ({ ...prev, rateLimit: { ...prev.rateLimit, [key]: value } }));
    };

    return (
        <div className="grid grid-cols-10 gap-4 items-start w-full">
            <section className={`${cardClass} col-span-5`}>
                <h6 className={cardTitleClass}>Details</h6>

                <div className="space-y-3">
                    <label className={fieldRowClass}>
                        <span className={labelClass}>Name</span>
                        <input
                            className={isReadOnly ? readOnlyInputClass : editableInputClass}
                            value={form.name}
                            readOnly={isReadOnly}
                            onChange={(e) => update("name", e.target.value)}
                        />
                    </label>

                    <label className={fieldRowClass}>
                        <span className={labelClass}>Base URL</span>
                        <input
                            className={isReadOnly ? readOnlyInputClass : editableInputClass}
                            value={form.baseUrl}
                            readOnly={isReadOnly}
                            onChange={(e) => update("baseUrl", e.target.value)}
                        />
                    </label>

                    <label className={fieldRowClass}>
                        <span className={labelClass}>Enabled</span>
                        <input
                            type="checkbox"
                            className={checkboxClass}
                            checked={!!form.enabled}
                            disabled={isReadOnly}
                            onChange={(e) => update("enabled", e.target.checked)}
                        />
                    </label>

                    <label className={fieldRowClass}>
                        <span className={labelClass}>Proxy enabled</span>
                        <input
                            type="checkbox"
                            className={checkboxClass}
                            checked={!!form.proxyEnabled}
                            disabled={isReadOnly}
                            onChange={(e) => update("proxyEnabled", e.target.checked)}
                        />
                    </label>
                </div>
            </section>

            <section className={`${cardClass} col-span-5`}>
                <h6 className={cardTitleClass}>Paths</h6>

                <div className="space-y-3">
                    <label className={fieldRowClass}>
                        <span className={labelClass}>Search</span>
                        <input
                            className={isReadOnly ? readOnlyInputClass : editableInputClass}
                            value={form.path.search}
                            readOnly={isReadOnly}
                            onChange={(e) => updatePath("search", e.target.value)}
                        />
                    </label>

                    <label className={fieldRowClass}>
                        <span className={labelClass}>Book result selector</span>
                        <input
                            className={isReadOnly ? readOnlyInputClass : editableInputClass}
                            value={form.path.bookResultSelector}
                            readOnly={isReadOnly}
                            onChange={(e) => updatePath("bookResultSelector", e.target.value)}
                        />
                    </label>

                    <label className={fieldRowClass}>
                        <span className={labelClass}>Book rating score selector</span>
                        <input
                            className={isReadOnly ? readOnlyInputClass : editableInputClass}
                            value={form.path.bookRatingScoreSelector}
                            readOnly={isReadOnly}
                            onChange={(e) => updatePath("bookRatingScoreSelector", e.target.value)}
                        />
                    </label>

                    <label className={fieldRowClass}>
                        <span className={labelClass}>Book rating count selector</span>
                        <input
                            className={isReadOnly ? readOnlyInputClass : editableInputClass}
                            value={form.path.bookRatingCountSelector}
                            readOnly={isReadOnly}
                            onChange={(e) => updatePath("bookRatingCountSelector", e.target.value)}
                        />
                    </label>

                    <label className={fieldRowClass}>
                        <span className={labelClass}>Title space separator</span>
                        <input
                            className={isReadOnly ? readOnlyInputClass : editableInputClass}
                            value={form.path.titleSpaceSeparator}
                            readOnly={isReadOnly}
                            onChange={(e) => updatePath("titleSpaceSeparator", e.target.value)}
                        />
                    </label>
                </div>
            </section>

            <section className={`${cardClass} col-span-5`}>
                <h6 className={cardTitleClass}>Rate limit</h6>

                <div className="space-y-3">
                    <label className={fieldRowClass}>
                        <span className={labelClass}>Requests per minute</span>
                        <input
                            className={isReadOnly ? readOnlyInputClass : editableInputClass}
                            value={String(form.rateLimit.requestsPerMinute)}
                            readOnly={isReadOnly}
                            onChange={(e) =>
                                updateRateLimit("requestsPerMinute", Number(e.target.value) || 0)
                            }
                        />
                    </label>

                    <label className={fieldRowClass}>
                        <span className={labelClass}>Burst</span>
                        <input
                            className={isReadOnly ? readOnlyInputClass : editableInputClass}
                            value={String(form.rateLimit.burst)}
                            readOnly={isReadOnly}
                            onChange={(e) => updateRateLimit("burst", Number(e.target.value) || 0)}
                        />
                    </label>
                </div>
            </section>
        </div>
    );
}