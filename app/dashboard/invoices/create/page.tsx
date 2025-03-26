import { fetchGetCostumers } from "@/app/helpers/api";
import { bebas } from "@/app/ui/fonts";
import { Breadcrumbs, CreateForm } from "anjrot-components";
import Link from "next/link";
import '../../../ui/globals.css'
import FormWrapper from "@/app/components/FormWrapper";

const breacrumbs = [
    { label: "Invoices", href: "/dashboard/invoices" },
    { label: "Create Invoice", href: "/dashboard/invoices/create", active: true }
]

const Createinvoices = async () => {

    const getCustomers = await fetchGetCostumers();

    return (
        <main>
            <Breadcrumbs breadcrumb={breacrumbs} className={bebas.className} />
            <FormWrapper customers={getCustomers} /> 
        </main>
    );
}

export default Createinvoices;