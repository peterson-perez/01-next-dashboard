import { InfoCard } from "anjrot-components";
import { fetchCardData } from "../helpers/api";

const CardWrapper = async () => {

    const { numberOfCustomers, numberOfInvoicesCount, totalPaidInvoices, totalPendingInvoices } = await fetchCardData();

    return (
        <>
            <InfoCard title="Collected" value={totalPaidInvoices} type="collected" currency={{ locale: "en-US", currency: "USD" }} />
            <InfoCard title="Peding" value={totalPendingInvoices} type="pending" currency={{ locale: "en-US", currency: "USD" }} />
            <InfoCard title="Total Invoices" value={numberOfInvoicesCount} type="invoices" />
            <InfoCard title="Total Costumers" value={numberOfCustomers} type="customers" />
        </>
    );
};

export default CardWrapper;