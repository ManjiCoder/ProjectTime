import { appName } from "@/types";
import Head from "next/head";

export default function DynamicHead() {
  return (
    <Head>
      <title>{appName}</title>
    </Head>
  );
}
