import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Link from "next/link";
import { useUser } from "..";
import DeletePoster from "../contribute/deletePoster";

export const CONTRIBUTOR_POSTERS_QUERY = gql`
  query CONTRIBUTOR_POSTERS_QUERY($userId: String) {
    allPosters(where: { creator: $userId }) {
      id
      headliner
      supportingActs
      venue
      date
      image {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function ContributorPosters() {
  const { user, isVerified } = useUser();

  const { data, error, loading } = useQuery(CONTRIBUTOR_POSTERS_QUERY, {
    variables: { userId: user?.id || null },
  });
  if (loading) {
    return <p>{loading}</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  if (!isVerified) {
    return (
      <div className="one-column-grid">
        <div>
          <h2 className="title-copy">Your account is getting verified</h2>
          <p>
            Just like not everyone goes around town distributing posters to
            coffee shops and stapling them to street poles, not everyone needs
            to be adding things to this archive.
          </p>
          <p>
            We appreciate your interest and promise to get back to you quickly.
          </p>
          <p> Please check back later or wait for an email from us!</p>
        </div>
      </div>
    );
  }

  if (isVerified && data.allPosters.length === 0) {
    return (
      <div className="one-column-grid">
        <div>
          <h2 className="title-copy">Account Verified!</h2>
          <p>Thanks for your patience. Your contributions will show up here.</p>
          <p>
            Let's get started: <Link href="/add">add a poster</Link>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="contributor-grid">
      {data.allPosters.map((poster) => (
        <div key={poster.id} className="contributor-grid-item">
          <img
            alt={`${poster.headliner} with ${poster.supportingActs} at ${poster.venue}
          on ${poster.date}`}
            className="contributor-grid-item-image"
            src={poster.image.image.publicUrlTransformed}
          />
          <div className="contributor-grid-item-controls">
            <Link href={`/poster/${poster.id}`}>Edit</Link>
            <DeletePoster id={poster.id} />
          </div>
        </div>
      ))}
    </div>
  );
}
