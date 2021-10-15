import Head from "next/head";
import ContributorPosters from "../components/posters/contributorPosters";

export default function Account() {
  return (
    <>
      <Head>
        <title>Showup Dashboard</title>
      </Head>
      <ContributorPosters />
    </>
  );
}
