import { bebas } from "../../ui/fonts";
import CardWrapper from "../../components/CardWrapper";
import ChartWrapper from "../../components/ChartWrapper";
import LatestInvoincesWrapper from "../../components/LatestInvoincesWrapper";
import { Suspense } from "react";
import { CardsSkeleton, RevenueChartSkeleton, LatestInvoicesSkeleton } from "@/app/components/Skeleton";


const Dashboard = () => {

    return (
        <main >
            <h1 className={`${bebas.className} mb-4 text-xl md:text-2xl`}>Dashboard</h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Suspense fallback={<CardsSkeleton />}>
                    <CardWrapper />
                </Suspense>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <div className="w-full md:col-span-4">
                    <h2 className={`${bebas.className} mb-4 text-xl md:text-2xl`}>Recent Revenues</h2>
                    <Suspense fallback={<RevenueChartSkeleton />}>
                        <ChartWrapper />
                    </Suspense>
                </div>
                <div className="w-full md:col-span-4">
                    <h2 className={`${bebas.className} mb-4 text-xl md:text-2xl`}>Lastest invoices</h2>
                    <Suspense fallback={<LatestInvoicesSkeleton />}>
                        <LatestInvoincesWrapper />
                    </Suspense>
                </div>
            </div>
        </main>
    );
};

export default Dashboard;