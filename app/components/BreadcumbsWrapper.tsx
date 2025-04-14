import { Breadcrumbs } from "anjrot-components";
import { FC } from "react";
import { bebas } from "../ui/fonts";


const BreadcumbsWrapper: FC<{ label: string, href: string }> = ({ label, href}) => {

    let breadcrumb = [
        { label: "Invoices", href: "/dashboard/invoices", active: false },
        { label: label, href: href, active: true }
    ]



    return <Breadcrumbs breadcrumb={breadcrumb} className={`${bebas.className}`} />
}

export default BreadcumbsWrapper;