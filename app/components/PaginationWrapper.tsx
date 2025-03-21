"use client";

import { Pagination } from "anjrot-components";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { FC } from "react";

const PaginationWrapper: FC<{ totalPages: number }> = ({ totalPages }) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    const createPageURL = (PageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", PageNumber.toString());
        return `${pathname}?${params.toString()}`
    }

    return (
        <Pagination totalPages={totalPages} currentPage={currentPage} createPageURL={createPageURL} AnchorElement={Link} />
    );
};

export default PaginationWrapper;