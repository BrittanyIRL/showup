import { RequestReset, ResetForm } from "../components";

export default function ResetPage({ query }) {
  if (!query?.token) {
    return (
      <>
        <p>You're missing a token, bro.</p>
        <RequestReset />
      </>
    );
  }
  return (
    <>
      <h2>Reset Password {query.token}</h2>
      <ResetForm token={query.token} />
    </>
  );
}
