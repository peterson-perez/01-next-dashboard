const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZGIwODA4NjFjYzI2MzJhOWQwMWEyYSIsImVtYWlsIjoicGV0ZXJzb25AZ21haWwuY29tIiwibmFtZSI6InBldGVyc29uIiwiaWF0IjoxNzQyNDA3OTcxfQ.2knw9WMl0J0g_ZQQWDTyznl2FBAfgAN5AsaGsweilNw"
}


export const fetchCardData = async () => {

    try {

        const [getCostumerCount, getInvoicesCount, getInvoicesStatusCount] = await Promise.all([
            fetch(`${process.env.BACKEND_URL}/customer/count`, { headers }),
            fetch(`${process.env.BACKEND_URL}/invoices/count`, { headers }),
            fetch(`${process.env.BACKEND_URL}/invoices/status-count`, { headers })
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
        console.log("error =>", error);
        throw new Error('Failed to fetch card data.');
    }
}


export const fetchRevenuesData = async () => {
    try {
        const getRevenues = await fetch(`${process.env.BACKEND_URL}/revenues`, { headers });

        const resultRevenues = await getRevenues.json()
        return resultRevenues;

    } catch (error) {
        console.log("error =>", error);
        throw new Error('Failed to fetch resultRevenues data.');
    }
}


export const fetchLastestInvoices = async () => {
    try {
        const getInvoices = await fetch(`${process.env.BACKEND_URL}/invoices`, { headers });
        const resultgetInvoices = await getInvoices.json()

        return resultgetInvoices;

    } catch (error) {
        console.log("error =>", error);
        throw new Error('Failed to fetch resultgetInvoices data.');
    }
}

export const fetchFilteredInvoices = async (query?: string, currentPage?: number) => {
    try {
        const getFilteredInvoices = await fetch(`${process.env.BACKEND_URL}/invoices/paginate?q=${query}&page=${currentPage}`, { headers });
        const resultFilteredInvoices = await getFilteredInvoices.json();

        return resultFilteredInvoices;
    } catch (error) {
        console.log("error =>", error);
        throw new Error('Failed to fetch resultFilteredInvoices data.');
    }

}

export const fetchInvoicesPages = async (query: string) => {
    try {
        const getInvoicePages = await fetch(`${process.env.BACKEND_URL}/invoices/page-count?q=${query}`, { headers });
        const resultGetInvoicePages = await getInvoicePages.json();

        return resultGetInvoicePages;
    } catch (error) {
        console.log("error =>", error);
        throw new Error('Failed to fetch resultGetInvoicePages data.');
    }
}

export const fetchGetCostumers = async () => {
    try {
        const getCostumers = await fetch(`${process.env.BACKEND_URL}/customer`, { headers });
        const resultGetCostumers = await getCostumers.json();

        return resultGetCostumers;
    } catch (error) {
        console.log(error)
        throw new Error('Failed to fetch resultGetCostumers data.')
    }
}

export const fetchGetInvoiceById = async (id: string) => {
    try {
        const getInvoice = await fetch(`${process.env.BACKEND_URL}/invoice/${id}`, { headers })
        if (getInvoice.status === 404) return null;
        if (getInvoice.status !== 200) throw new Error("Error fetching invoice!!!");
        const resultGetInvoice = await getInvoice.json()

        return resultGetInvoice;
    } catch (error) {
        console.log(error)
        throw new Error('Failed to fetch resultGetInvoice data.')
    }
}