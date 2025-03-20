import { InfoCard } from "anjrot-components";
import { bebas } from "../ui/fonts";
import { fetchCardData } from "../helpers/api";


const Dashboard = async () => {

    const { numberOfCustomers, numberOfInvoicesCount, totalPaidInvoices, totalPendingInvoices } = await fetchCardData();
    return (
        <main >
            <h1 className={`${bebas.className} mb-4 text-xl md:text-2xl`}>Dashboard</h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <InfoCard title="Collected" value={totalPaidInvoices} type="collected" currency={{ locale: "en-US", currency: "USD" }} />
                <InfoCard title="Peding" value={totalPendingInvoices} type="pending" currency={{ locale: "en-US", currency: "USD" }} />
                <InfoCard title="Total Invoices" value={numberOfInvoicesCount} type="invoices" />
                <InfoCard title="Total Costumers" value={numberOfCustomers} type="customers" />
            </div>
        </main>
    );
};

export default Dashboard;