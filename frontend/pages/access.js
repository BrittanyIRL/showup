import Link from "next/link";
import { SignIn } from "../components";

export default function Contribute() {
  return (
    <div className="form-page">
      <p>
        Welcome back! If you're new here, let's{" "}
        <Link href="/requestAccess">get introduced</Link>.{" "}
      </p>
      <SignIn />
      <Link className="reset-link" href="/resetAccess">
        Need your password reset?
      </Link>
    </div>
  );
}
