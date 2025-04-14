import { fetchGetCostumers } from "@/app/helpers/api";
import '../../../ui/globals.css'
import FormWrapper from "@/app/components/FormWrapper";
import BreadcumbsWrapper from "@/app/components/BreadcumbsWrapper";

const Createinvoices = async () => {

    const getCustomers = await fetchGetCostumers();

    return (
        <main>
            <BreadcumbsWrapper label="Create Invoice" href="/invoices/create"/>
            <FormWrapper customers={getCustomers} /> 
        </main>
    );
}

export default Createinvoices;