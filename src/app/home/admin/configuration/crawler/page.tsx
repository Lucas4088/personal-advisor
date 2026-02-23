"use client"

import ListCard from "luksal/app/components/ListCard";
import {CrawlerSetting} from "luksal/app/types/crawler";
import {Column} from "luksal/app/types/list";
import Modal, {ModalMode} from "luksal/app/components/Modal";
import React from "react";
import CrawlerDetailsView from "./CrawlerDetailsView";


export default function Page() {
    const [selected, setSelected] = React.useState<CrawlerSetting | null>(null);
    const [mode, setMode] = React.useState<ModalMode>(ModalMode.View);

    const crawlerSettings: CrawlerSetting[] = [
        {
            id: 1,
            name: "goodreads",
            enabled: true,
            baseUrl: "https://www.goodreads.com",
            proxyEnabled: false,
            rateLimit: {
                requestsPerMinute: 30,
                burst: 5,
            },
            path: {
                bookResultSelector: "a.bookTitle[itemprop=url]",
                bookRatingCountSelector: "div.RatingStatistics__meta",
                bookRatingScoreSelector: "div.RatingStatistics__rating",
                search: "/search?q={formattedTitle}",
                titleSpaceSeparator: "+",
            },
        },
        {
            id: 2,
            name: "amazon-books",
            enabled: true,
            baseUrl: "https://www.amazon.com",
            proxyEnabled: true,
            rateLimit: {
                requestsPerMinute: 30,
                burst: 5,
            },
            path: {
                bookResultSelector: "div[data-cy=title-recipe] a.a-link-normal",
                bookRatingCountSelector: "#acrCustomerReviewText",
                bookRatingScoreSelector:
                    "#averageCustomerReviews span.a-size-small.a-color-base",
                search: "/s?k={formattedTitle}&i=stripbooks",
                titleSpaceSeparator: "+",
            },
        },
        {
            id: 3,
            name: "the-story-graph",
            enabled: true,
            baseUrl: "https://app.thestorygraph.com",
            proxyEnabled: true,
            rateLimit: {
                requestsPerMinute: 30,
                burst: 5,
            },
            path: {
                bookResultSelector: "h3 > a[href^=/books/]",
                bookRatingCountSelector:
                    "turbo-frame#community_reviews span.text-sm a.inverse-link",
                bookRatingScoreSelector: "span.average-star-rating",
                search: "/browse?search_term={formattedTitle}",
                titleSpaceSeparator: "+",
            },
        },
    ]

    const columns: Column<CrawlerSetting>[] = [
        {
            header: "Id",
            accessor: "id"
        },
        {header: "Name", accessor: "name"},
        {header: "Enabled", accessor: "enabled"},
        {header: "URL", accessor: "baseUrl"},
    ];


    return (
        <div className="p-1 space-y-6">
            <div className="grid grid-cols-1 gap-6">
                <ListCard data={crawlerSettings}
                          columns={columns}
                          onRowClick={(row) => {
                              setSelected(row)
                              setMode(ModalMode.View)
                          }}
                          onEditRow={(row) => {
                              setSelected(row)
                              setMode(ModalMode.Edit)
                          }}
                          onDeleteRow={(row) => {
                              setSelected(row)
                              setMode(ModalMode.Delete)
                          }}
                />
                <Modal open={!!selected} onClose={() => setSelected(null)} mode={mode} id = {selected?.id}>
                    {selected && !ModalMode.isDelete(mode) ? <CrawlerDetailsView selected={selected} mode={mode}/> : null}
                </Modal>
            </div>
        </div>
    )
}