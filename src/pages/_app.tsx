import DynamicHead from "@/components/DynamicHead";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <DynamicHead>
        <title>Jai Shree Ram</title>
      </DynamicHead>
    </>
  );
}
