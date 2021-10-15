import Head from "next/head";
import { Posters } from "../components";
import SvgHeader from "../components/shared/svgHeader";

export default function Index() {
  return (
    <>
      <Head>
        <title>Showup</title>
      </Head>
      <div className="main-page">
        <Posters /> <SvgHeader />
      </div>
    </>
  );
}
