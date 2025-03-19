import { FaFileInvoice, FaHome, FaUsers } from "react-icons/fa";

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
        href: "/invoices",
        icon: FaFileInvoice
    },
    {
        id: Math.random(),
        name: "Customers",
        href: "/customers",
        icon: FaUsers
    }
];

const NavLinks = () => {

    return (
        <>
            {
                links.map(e => {
                    const LinIcon = e.icon
                    return <a key={e.id} href={e.href} className="flex h-[48px] grow items-center 
                                justify-center gap-2 rounded-md bg-slate-500 p-3 
                                text-lg text-white font-bold hover:bg-slate-400
                                hover:text-white md:flex-none md:justify-start 
                                 md:p-2 md:px-3">
                        <LinIcon className="w-6" />
                        <p className="hidden md:block">{e.name}</p>
                    </a>
                })
            }
        </>
    );
}

export default NavLinks;