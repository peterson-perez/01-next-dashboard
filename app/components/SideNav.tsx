import { FaFileInvoice, FaHome, FaPowerOff, FaUsers } from "react-icons/fa";
import { Logo } from "./Logo";
import NavLinks from "./NavLinks";
import Link from "next/link";
import { signOut } from "next-auth/react";

const SideNav = () => {
    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
            <Link href="#" className="mb-2 text-white flex h-20 items-end justify-start bg-slate-900 p-4 md:h-40">
                <div className="w-32 md:w-40 ">
                    <Logo />
                </div>
            </Link>
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <NavLinks />
                <div className="hidden h-auto w-full grow md:block"></div>
                <form
                    action={async () => {
                        "use server";

                        await signOut({ redirectTo: "/" });
                    }}
                >
                    <button type="submit" className="flex h-[48px] w-full grow items-center 
                        justify-center gap-2 rounded-md bg-slate-500 p-3 
                        text-lg text-white font-bold hover:bg-slate-400
                        hover:text-white md:flex-none md:justify-start 
                         md:p-2 md:px-3">
                        <FaPowerOff className="w-6" />
                        <p className="hidden md:block">Logout</p>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SideNav;