import FormEditWrapper from "@/app/components/FormEditWrapper";
import { fetchGetCostumers, fetchGetInvoiceById } from "@/app/helpers/api";
import { bebas } from "@/app/ui/fonts";
import { Breadcrumbs } from "anjrot-components";
import { FC } from "react";

interface EditInvoiceProps {
    params: Promise<{ id: string }>
}

const EditInvoice: FC<EditInvoiceProps> = async ({ params }) => {
    const path = await params
    const id = path.id

    const breacrumbs = [
        { label: "Invoices", href: "/dashboard/invoices" },
        { label: "Create Invoice", href: `/dashboard/invoices/${id}/edit`, active: true }
    ]

    const [getCostumer, getInvoice] = await Promise.all([fetchGetCostumers(), fetchGetInvoiceById(id)])

    return (
        <main>
            <Breadcrumbs breadcrumb={breacrumbs} className={bebas.className} />
            <FormEditWrapper customers={getCostumer} invoice={getInvoice}/>
        </main>
    );
}

export default EditInvoice;