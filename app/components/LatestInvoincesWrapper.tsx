import { LatestInvoices } from "anjrot-components";
import { fetchLastestInvoices } from "../helpers/api";
import Image from "next/image";

const LatestInvoincesWrapper = async () => {

    const getLatestInvoinces = await fetchLastestInvoices();
    console.log(getLatestInvoinces)
     
    return <LatestInvoices latestInvoices={getLatestInvoinces} ImgComponent={Image} className="bg-slate-700" footer={{className: "text-white"}}/>;
};

export default LatestInvoincesWrapper;