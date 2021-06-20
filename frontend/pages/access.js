import { SignIn, SignUp, RequestReset } from "../components";

export default function Contribute() {
  // todo differentiate between when to sign in or sign up
  return (
    <>
      <p>Have something to share? </p>
      <SignIn />
      <SignUp />
      <RequestReset />
    </>
  );
}
