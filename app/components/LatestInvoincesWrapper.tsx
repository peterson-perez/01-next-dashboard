import { LatestInvoices } from "anjrot-components";
import { fetchLastestInvoices } from "../helpers/api";

const LatestInvoincesWrapper = async () => {

    const getLatestInvoinces = await fetchLastestInvoices();
     
    return <LatestInvoices latestInvoices={getLatestInvoinces} className="bg-slate-700" footer={{className: "text-white"}}/>;
};

export default LatestInvoincesWrapper;