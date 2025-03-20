import InvoicesWrapper from "@/app/components/InvoicesWrapper";
import { InvoiceSkeleton } from "@/app/components/Skeleton";
import { bebas } from "@/app/ui/fonts";
import { SearchInput } from "anjrot-components";
import { Suspense } from "react";

const Invoices = () => {
    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-center">
                <h1 className={`${bebas.className} text-2xl`}>Invoices</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <SearchInput placeholder="Search..."/>
            </div>
            <Suspense fallback={<InvoiceSkeleton />}>
                <InvoicesWrapper />
            </Suspense>
        </div>
    );
};

export default Invoices;