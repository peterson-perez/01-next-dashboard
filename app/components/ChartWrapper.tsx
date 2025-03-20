import { RevenueChart } from "anjrot-components";
import { fetchRevenuesData } from "../helpers/api";

const ChartWrapper = async () => {

    const revenues = await fetchRevenuesData();

    return <RevenueChart revenues={revenues} chartHeight={350} />;
};

export default ChartWrapper;