import { InvoiceTable } from "anjrot-components";
import { fetchFilteredInvoices } from "../helpers/api";
import Image from "next/image";

const InvoicesWrapper = async () => {

    const getInvoices = await fetchFilteredInvoices();

    return <InvoiceTable invoices={getInvoices} ImgComponent={Image} className="bg-slate-700" tableHeader={{ className: "text-white" }} />;
};

export default InvoicesWrapper;