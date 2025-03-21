import { InvoiceTable } from "anjrot-components";
import { fetchFilteredInvoices } from "../helpers/api";
import Image from "next/image";
import { FC } from "react";

interface InvoiceWraperProps {
    query?: string
    page?: number
}

const InvoicesWrapper: FC<InvoiceWraperProps> = async ({query, page}) => {

    const getInvoices = await fetchFilteredInvoices(query || "", page);

    return <InvoiceTable invoices={getInvoices} ImgComponent={Image} className="bg-slate-700" tableHeader={{ className: "text-white" }} />;
};

export default InvoicesWrapper;