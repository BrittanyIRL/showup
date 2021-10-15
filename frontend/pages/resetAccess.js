import Head from "next/head";
import { RequestReset } from "../components";

export default function ResetAccess() {
  return (
    <>
      <Head>
        <title>Reset Password</title>
      </Head>
      <div className="one-column-grid">
        <RequestReset />
      </div>
    </>
  );
}
