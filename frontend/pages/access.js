import Link from "next/link";
import { SignIn } from "../components";

export default function Contribute() {
  return (
    <div className="two-column-grid">
      <div>
        <h2 className="title-copy">Welcome back!</h2>
        <p>
          Welcome back! If you're new here, let's{" "}
          <Link href="/requestAccess">get introduced</Link>.{" "}
        </p>
        <p>
          Or, if you forgot your password, let's{" "}
          <Link href="/resetAccess">reset it</Link>.
        </p>
      </div>
      <div>
        <SignIn />
      </div>
    </div>
  );
}
