import "@styles/globals.scss";
import { Analytics } from "@vercel/analytics/react";
import localFont from "@next/font/local";

export default function App({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps} />
            <Analytics />
        </>
    );
}
