import { InvoiceTable } from "anjrot-components";
import { fetchFilteredInvoices } from "../helpers/api";
import Image from "next/image";
import { FC } from "react";

interface InvoiceWraperProps {
    query?: string
}

const InvoicesWrapper: FC<InvoiceWraperProps> = async ({query}) => {

    const getInvoices = await fetchFilteredInvoices(query || "");

    return <InvoiceTable invoices={getInvoices} ImgComponent={Image} className="bg-slate-700" tableHeader={{ className: "text-white" }} />;
};

export default InvoicesWrapper;