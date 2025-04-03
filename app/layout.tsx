import { FC, PropsWithChildren } from "react";
import '@/app/ui/globals.css'
import { roboto } from "./ui/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        default: "Anjrot Dev",
        template: "%s | Anjrot Dashboard"
    },
    description: "Tutorial del tutorial de Next Js"
}

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <html>
            <body className={`${roboto.className} antialiased`}>{children}</body>
        </html>
    );
};

export default RootLayout;