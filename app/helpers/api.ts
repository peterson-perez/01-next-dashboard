import { auth } from "@/auth";
import { authHeaders } from "./utils";


export const fetchCardData = async () => {
    const session = await auth()

    try {

        const [getCostumerCount, getInvoicesCount, getInvoicesStatusCount] = await Promise.all([
            fetch(`${process.env.BACKEND_URL}/customer/count`, {
                headers: authHeaders(session?.user?.token)
            }),
            fetch(`${process.env.BACKEND_URL}/invoices/count`, {
                headers: authHeaders(session?.user?.token)
            }),
            fetch(`${process.env.BACKEND_URL}/invoices/status-count`, {
                headers: authHeaders(session?.user?.token)
            })
        ])

        const resultCostumerCount = await getCostumerCount.json();
        const resultInvoicesCount = await getInvoicesCount.json();
        const resultInvoicesStatusCount = await getInvoicesStatusCount.json();

        const numberOfCustomers = Number(resultCostumerCount ?? "0");
        const numberOfInvoicesCount = Number(resultInvoicesCount ?? "0");
        const totalPaidInvoices = resultInvoicesStatusCount.paid ?? "0";
        const totalPendingInvoices = resultInvoicesStatusCount.pending ?? "0";

        return {
            numberOfCustomers,
            numberOfInvoicesCount,
            totalPaidInvoices,
            totalPendingInvoices
        };

    } catch (error) {
        throw new Error('Failed to fetch card data.' + error);
    }
}


export const fetchRevenuesData = async () => {
    const session = await auth()
    try {
        const getRevenues = await fetch(`${process.env.BACKEND_URL}/revenues`, {
            headers: authHeaders(session?.user?.token)
        });

        const resultRevenues = await getRevenues.json()
        return resultRevenues;

    } catch (error) {
        throw new Error('Failed to fetch resultRevenues data.' + error);
    }
}


export const fetchLastestInvoices = async () => {
    const session = await auth()
    try {
        const getInvoices = await fetch(`${process.env.BACKEND_URL}/invoices`, { headers: authHeaders(session?.user?.token) });
        const resultgetInvoices = await getInvoices.json()

        return resultgetInvoices;

    } catch (error) {
        throw new Error('Failed to fetch resultgetInvoices data.' + error);
    }
}

export const fetchFilteredInvoices = async (query?: string, currentPage?: number) => {
    const session = await auth()
    try {
        const getFilteredInvoices = await fetch(`${process.env.BACKEND_URL}/invoices/paginate?q=${query}&page=${currentPage}`, { headers: authHeaders(session?.user?.token) });
        const resultFilteredInvoices = await getFilteredInvoices.json();

        return resultFilteredInvoices;
    } catch (error) {
        throw new Error('Failed to fetch resultFilteredInvoices data.' + error);
    }

}

export const fetchInvoicesPages = async (query: string) => {
    const session = await auth()
    try {
        const getInvoicePages = await fetch(`${process.env.BACKEND_URL}/invoices/page-count?q=${query}`, { headers: authHeaders(session?.user?.token) });
        const resultGetInvoicePages = await getInvoicePages.json();

        return resultGetInvoicePages;
    } catch (error) {
        throw new Error('Failed to fetch resultGetInvoicePages data.' + error);
    }
}

export const fetchGetCostumers = async () => {
    const session = await auth()
    try {
        const getCostumers = await fetch(`${process.env.BACKEND_URL}/customer`, { headers: authHeaders(session?.user?.token) });
        const resultGetCostumers = await getCostumers.json();

        return resultGetCostumers;
    } catch (error) {
        throw new Error('Failed to fetch resultGetCostumers data.' + error)
    }
}

export const fetchGetInvoiceById = async (id: string) => {
    const session = await auth()
    try {
        const getInvoice = await fetch(`${process.env.BACKEND_URL}/invoice/${id}`, { headers: authHeaders(session?.user?.token) })
        if (getInvoice.status === 404) return null;
        if (getInvoice.status !== 200) throw new Error("Error fetching invoice!!!");
        const resultGetInvoice = await getInvoice.json()

        return resultGetInvoice;
    } catch (error) {
        throw new Error('Failed to fetch resultGetInvoice data.' + error)
    }
}