import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { Nunito_Sans } from "next/font/google";

const nunitoSans = Nunito_Sans({
  weight: "400",
  subsets: ["latin-ext"],
  variable: "--font-nunito-sans",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${nunitoSans.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}
