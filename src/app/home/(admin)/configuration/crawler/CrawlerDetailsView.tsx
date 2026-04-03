"use client"

import React from "react";
import {CrawlerSetting} from "luksal/app/types/crawler";
import {ModalMode} from "luksal/app/components/Modal";

type Props = {
    selected: CrawlerSetting;
    mode: ModalMode;
}

const fieldRowClass = "flex flex-col gap-1";
const fieldCheckboxRowClass = "flex gap-2";
const labelClass = "text-sm text-gray-700";
const readOnlyInputClass =
    "w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 shadow-sm";
const editableInputClass =
    "w-full rounded-md border border-gray-300 bg-white-600 px-3 py-2 text-sm text-gray-900 shadow-sm ";
const cardClass =
    "bg-white p-5 w-full rounded-lg border border-gray-200 shadow-sm";
const cardTitleClass =
    "mb-4 text-sm font-semibold text-gray-900 text-center";
const checkboxClass =
    "h-4 w-4 rounded border border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 disabled:opacity-60";

export default function CrawlerDetailsView({selected, mode}: Props) {
    const isReadOnly = ModalMode.isReadOnly(mode);

    const [form, setForm] = React.useState<CrawlerSetting>(selected);

    React.useEffect(() => {
        setForm(selected);
    }, [selected]);

    const update = <K extends keyof CrawlerSetting>(key: K, value: CrawlerSetting[K]) => {
        if (isReadOnly) return;
        setForm((prev) => ({...prev, [key]: value}));
    };

    const updatePath = <K extends keyof CrawlerSetting["path"]>(
        key: K,
        value: CrawlerSetting["path"][K],
    ) => {
        if (isReadOnly) return;
        setForm((prev) => ({...prev, path: {...prev.path, [key]: value}}));
    };

    const updateRateLimit = <K extends keyof CrawlerSetting["rateLimit"]>(
        key: K,
        value: CrawlerSetting["rateLimit"][K],
    ) => {
        if (isReadOnly) return;
        setForm((prev) => ({...prev, rateLimit: {...prev.rateLimit, [key]: value}}));
    };

    return (
        <div className="flex gap-4 items-start w-full">

            <div className="flex flex-col w-full gap-4 ">
                <section className={`${cardClass}`}>
                    <h6 className={cardTitleClass}>Details</h6>

                    <div className="space-y-3">
                        <label className={fieldRowClass}>
                            <span className={labelClass}>Name</span>
                            <input
                                className={isReadOnly ? readOnlyInputClass : editableInputClass}
                                name="name"
                                required
                                value={form.name}
                                readOnly={isReadOnly}
                                onChange={(e) => update("name", e.target.value)}
                            />
                        </label>

                        <label className={fieldRowClass}>
                            <span className={labelClass}>Base URL</span>
                            <input
                                className={isReadOnly ? readOnlyInputClass : editableInputClass}
                                name="baseUrl"
                                required
                                type="url"
                                value={form.baseUrl}
                                readOnly={isReadOnly}
                                onChange={(e) => update("baseUrl", e.target.value)}
                            />
                        </label>

                        <label className={fieldCheckboxRowClass}>
                            <input
                                type="checkbox"
                                name="enabled"
                                className={checkboxClass}
                                checked={!!form.enabled}
                                disabled={isReadOnly}
                                onChange={(e) => update("enabled", e.target.checked)}
                            />
                            <span className={labelClass}>Enabled</span>
                        </label>

                        <label className={fieldCheckboxRowClass}>
                            <input
                                type="checkbox"
                                name="proxyEnabled"
                                className={checkboxClass}
                                checked={!!form.proxyEnabled}
                                disabled={isReadOnly}
                                onChange={(e) => update("proxyEnabled", e.target.checked)}
                            />
                            <span className={labelClass}>Proxy enabled</span>
                        </label>
                        <label className={fieldRowClass}>
                            <span className={labelClass}>Proxy name</span>
                            <input
                                className={isReadOnly ? readOnlyInputClass : editableInputClass}
                                name="proxyName"
                                value={form.proxyName}
                                readOnly={isReadOnly}
                                onChange={(e) => update("proxyName", e.target.value)}
                            />
                        </label>
                        <label className={fieldCheckboxRowClass}>
                            <input
                                type="checkbox"
                                name="proxySessionEnabled"
                                className={checkboxClass}
                                checked={!!form.proxySessionEnabled}
                                disabled={isReadOnly}
                                onChange={(e) => update("proxySessionEnabled", e.target.checked)}
                            />
                            <span className={labelClass}>Proxy session enabled</span>
                        </label>
                        <label className={fieldCheckboxRowClass}>
                            <input
                                type="checkbox"
                                name="forwardingProxyEnabled"
                                className={checkboxClass}
                                checked={!!form.forwardingProxyEnabled}
                                disabled={isReadOnly}
                                onChange={(e) => update("forwardingProxyEnabled", e.target.checked)}
                            />
                            <span className={labelClass}>Forwarding proxy enabled</span>
                        </label>
                    </div>
                </section>

                <section className={`${cardClass}`}>
                    <h6 className={cardTitleClass}>Rate limit</h6>

                    <div className="space-y-3">
                        <label className={fieldRowClass}>
                            <span className={labelClass}>Requests per minute</span>
                            <input
                                className={isReadOnly ? readOnlyInputClass : editableInputClass}
                                name="rateLimit.requestsPerMinute"
                                required
                                type="number"
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
                                name="rateLimit.burst"
                                required
                                type="number"
                                value={String(form.rateLimit.burst)}
                                readOnly={isReadOnly}
                                onChange={(e) => updateRateLimit("burst", Number(e.target.value) || 0)}
                            />
                        </label>
                    </div>
                </section>
            </div>

            <section className={`${cardClass} w-full`}>
                <h6 className={cardTitleClass}>Search paths</h6>
                <div className="space-y-3">
                    <label className={fieldRowClass}>
                        <span className={labelClass}>Search</span>
                        <input
                            className={isReadOnly ? readOnlyInputClass : editableInputClass}
                            name="path.search"
                            required
                            value={form.path.search}
                            readOnly={isReadOnly}
                            onChange={(e) => updatePath("search", e.target.value)}
                        />
                    </label>

                    <label className={fieldRowClass}>
                        <span className={labelClass}>Search result tag selector</span>
                        <input
                            className={isReadOnly ? readOnlyInputClass : editableInputClass}
                            name="path.searchPageLoadedSelector"
                            value={form.path.searchPageLoadedSelector}
                            readOnly={isReadOnly}
                            onChange={(e) => updatePath("searchPageLoadedSelector", e.target.value)}
                        />
                    </label>

                    <label className={fieldCheckboxRowClass}>
                        <input
                            type="checkbox"
                            name="path.includeAuthorsForSearch"
                            className={checkboxClass}
                            checked={!!form.path.includeAuthorsForSearch}
                            disabled={isReadOnly}
                            onChange={(e) => updatePath("includeAuthorsForSearch", e.target.checked)}
                        />
                        <span className={labelClass}>Include authors in search</span>
                    </label>

                    <label className={fieldCheckboxRowClass}>
                        <input
                            type="checkbox"
                            name="path.isRatingAvailableOnSearch"
                            className={checkboxClass}
                            checked={!!form.path.isRatingAvailableOnSearch}
                            disabled={isReadOnly}
                            onChange={(e) => updatePath("isRatingAvailableOnSearch", e.target.checked)}
                        />
                        <span className={labelClass}>Is rating available on search</span>
                    </label>

                    <label className={fieldRowClass}>
                        <span className={labelClass}>Book first element selector</span>
                        <input
                            className={isReadOnly ? readOnlyInputClass : editableInputClass}
                            name="path.bookFirstElementSearchSelector"
                            value={form.path.bookFirstElementSearchSelector}
                            readOnly={isReadOnly}
                            onChange={(e) => updatePath("bookFirstElementSearchSelector", e.target.value)}
                        />
                    </label>

                    <label className={fieldRowClass}>
                        <span className={labelClass}>Book rating score selector</span>
                        <input
                            className={isReadOnly ? readOnlyInputClass : editableInputClass}
                            name="path.bookRatingScoreSearchSelector"
                            value={form.path.bookRatingScoreSearchSelector}
                            readOnly={isReadOnly}
                            onChange={(e) => updatePath("bookRatingScoreSearchSelector", e.target.value)}
                        />
                    </label>

                    <label className={fieldRowClass}>
                        <span className={labelClass}>Book rating count selector</span>
                        <input
                            className={isReadOnly ? readOnlyInputClass : editableInputClass}
                            name="path.bookRatingCountSearchSelector"
                            value={form.path.bookRatingCountSearchSelector}
                            readOnly={isReadOnly}
                            onChange={(e) => updatePath("bookRatingCountSearchSelector", e.target.value)}
                        />
                    </label>

                    <label className={fieldRowClass}>
                        <span className={labelClass}>Book title selector</span>
                        <input
                            className={isReadOnly ? readOnlyInputClass : editableInputClass}
                            name="path.bookTitleSearchSelector"
                            value={form.path.bookTitleSearchSelector}
                            readOnly={isReadOnly}
                            onChange={(e) => updatePath("bookTitleSearchSelector", e.target.value)}
                        />
                    </label>

                    <label className={fieldRowClass}>
                        <span className={labelClass}>Book authors selector</span>
                        <input
                            className={isReadOnly ? readOnlyInputClass : editableInputClass}
                            name="path.bookAuthorsSearchSelector"
                            value={form.path.bookAuthorsSearchSelector}
                            readOnly={isReadOnly}
                            onChange={(e) => updatePath("bookAuthorsSearchSelector", e.target.value)}
                        />
                    </label>
                </div>
            </section>
            <section className={`${cardClass} w-full`}>
                <h6 className={cardTitleClass}>Details paths</h6>
                <div className="space-y-3">
                    <label className={fieldRowClass}>
                        <span className={labelClass}>Book result selector</span>
                        <input
                            className={isReadOnly ? readOnlyInputClass : editableInputClass}
                            name="path.bookResultSelector"
                            required
                            value={form.path.bookResultSelector}
                            readOnly={isReadOnly}
                            onChange={(e) => updatePath("bookResultSelector", e.target.value)}
                        />
                    </label>

                    <label className={fieldRowClass}>
                        <span className={labelClass}>Book rating score selector</span>
                        <input
                            className={isReadOnly ? readOnlyInputClass : editableInputClass}
                            name="path.bookRatingScoreSelector"
                            required
                            value={form.path.bookRatingScoreSelector}
                            readOnly={isReadOnly}
                            onChange={(e) => updatePath("bookRatingScoreSelector", e.target.value)}
                        />
                    </label>

                    <label className={fieldRowClass}>
                        <span className={labelClass}>Book rating count selector</span>
                        <input
                            className={isReadOnly ? readOnlyInputClass : editableInputClass}
                            name="path.bookRatingCountSelector"
                            required
                            value={form.path.bookRatingCountSelector}
                            readOnly={isReadOnly}
                            onChange={(e) => updatePath("bookRatingCountSelector", e.target.value)}
                        />
                    </label>

                    <label className={fieldRowClass}>
                        <span className={labelClass}>Book title selector</span>
                        <input
                            className={isReadOnly ? readOnlyInputClass : editableInputClass}
                            name="path.bookTitleSelector"
                            required
                            value={form.path.bookTitleSelector}
                            readOnly={isReadOnly}
                            onChange={(e) => updatePath("bookTitleSelector", e.target.value)}
                        />
                    </label>

                    <label className={fieldRowClass}>
                        <span className={labelClass}>Book authors selector</span>
                        <input
                            className={isReadOnly ? readOnlyInputClass : editableInputClass}
                            name="path.bookAuthorsSelector"
                            required
                            value={form.path.bookAuthorsSelector}
                            readOnly={isReadOnly}
                            onChange={(e) => updatePath("bookAuthorsSelector", e.target.value)}
                        />
                    </label>

                    <label className={fieldRowClass}>
                        <span className={labelClass}>Title space separator</span>
                        <input
                            className={isReadOnly ? readOnlyInputClass : editableInputClass}
                            name="path.titleSpaceSeparator"
                            required
                            value={form.path.titleSpaceSeparator}
                            readOnly={isReadOnly}
                            onChange={(e) => updatePath("titleSpaceSeparator", e.target.value)}
                        />
                    </label>


                </div>
            </section>

        </div>
    );
}