import Head from "next/head";
import { CreatePoster as _CreatePoster } from "../components";

export default function CreatePoster() {
  return (
    <>
      <Head>
        <title>Add a poster</title>
      </Head>
      <div className="one-column-grid">
        <_CreatePoster />
      </div>
    </>
  );
}
