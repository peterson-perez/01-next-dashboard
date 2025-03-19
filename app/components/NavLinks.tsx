"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFileInvoice, FaHome, FaUsers } from "react-icons/fa";
import { twMerge } from 'tailwind-merge'

const links = [
    {
        id: Math.random(),
        name: "Dashboard",
        href: "/dashboard",
        icon: FaHome
    },
    {
        id: Math.random(),
        name: "Invoices",
        href: "/dashboard/invoices",
        icon: FaFileInvoice
    },
    {
        id: Math.random(),
        name: "Customers",
        href: "/dashboard/customers",
        icon: FaUsers
    }
];

const NavLinks = () => {

    const pathname = usePathname();

    return (
        <>
            {
                links.map(e => {
                    const LinIcon = e.icon
                    return <Link key={e.id} href={e.href} className={twMerge(
                        "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-slate-700 p-3 text-lg text-white font-bold hover:bg-slate-500 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3",
                        pathname === e.href && "bg-slate-500")}>
                        <LinIcon className="w-6" />
                        <p className="hidden md:block">{e.name}</p>
                    </Link >
                })
            }
        </>
    );
}

export default NavLinks;