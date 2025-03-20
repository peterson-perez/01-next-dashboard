import { RevenueChart } from "anjrot-components";
import { fetchRevenuesData } from "../helpers/api";

const ChartWrapper = async () => {

    const revenues = await fetchRevenuesData();

    return <RevenueChart revenues={revenues} chartHeight={350} className="bg-slate-700"/>;
};

export default ChartWrapper;