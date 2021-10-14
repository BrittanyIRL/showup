import { SignUp } from "../components";

export default function RequestAccess() {
  // todo differentiate between when to sign in or sign up
  return (
    <div className="form-page">
      <div>
        <h3>
          First things first{" "}
          <span className="sr-only">: let's get introduced</span>
        </h3>
        <p>
          Not everyone's gonna need this, but if you have found this project and
          are an artist, a venue rep, band member, band rep or a street team
          member for a group (or someother person I've failed to include here)
          then please feel free to sign up below to contribute posters.
        </p>
        <p>
          Tl;Dr when you sign up, you're agreeing that you're only submitting
          art that belongs to you or you have permission to share. The purpose
          of this site is to be archival. Your shows will receive no SEO boosts
          by posting anything. There is no social aspect to this. Just a way to
          preserve art that usually gets torn apart on street poles and coffee
          shop bulletin boards.
        </p>
        <p>Email me with questions! email todo!</p>
      </div>
      <SignUp />
    </div>
  );
}
