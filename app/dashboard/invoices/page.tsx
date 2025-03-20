import InvoicesWrapper from "@/app/components/InvoicesWrapper";
import Search from "@/app/components/Search";
import { InvoiceSkeleton } from "@/app/components/Skeleton";
import { bebas } from "@/app/ui/fonts";
import { FC, Suspense } from "react";

interface InvocesProps {
    searchParams?: Promise<{ query?: string }>
}

const Invoices: FC<InvocesProps> = async ({ searchParams }) => {
    const params = await searchParams;

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-center">
                <h1 className={`${bebas.className} text-2xl`}>Invoices</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search />
            </div>
            <Suspense fallback={<InvoiceSkeleton />}>
                <InvoicesWrapper query={params?.query}/>
            </Suspense>
        </div>
    );
};

export default Invoices;