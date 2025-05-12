import FormEditWrapper from "@/app/components/FormEditWrapper";
import { fetchGetCostumers, fetchGetInvoiceById } from "@/app/helpers/api";
import { FC } from "react";
import notFound from "../../not-found";
import BreadcumbsWrapper from "@/app/components/BreadcumbsWrapper";

interface EditInvoiceProps {
    params: Promise<{ id: string }>
}

const EditInvoice: FC<EditInvoiceProps> = async ({ params }) => {
    const path = await params
    const id = path.id

    const [getCostumer, getInvoice] = await Promise.all([fetchGetCostumers(), fetchGetInvoiceById(id)])

    if (!getInvoice) {
        return notFound();
    }

    return (
        <main>
            <BreadcumbsWrapper label="Edit Invoice" href={`/invoices/${id}/edit`}/>
            <FormEditWrapper customers={getCostumer} invoice={getInvoice} />
        </main>
    );
}

export default EditInvoice;