import Head from "next/head";
import { RequestReset, ResetForm } from "../components";

export default function ResetPage({ query }) {
  if (!query?.token) {
    return (
      <>
        <Head>
          <title>Reset Password</title>
        </Head>
        <p>No token, no access</p>
        <RequestReset />
      </>
    );
  }
  return (
    <>
      <Head>
        <title>Reset Password</title>
      </Head>
      <h2>Reset Password {query.token}</h2>
      <ResetForm token={query.token} />
    </>
  );
}
