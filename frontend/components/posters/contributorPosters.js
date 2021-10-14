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
      <div className="notification-wrapper">
        <p>
          You're account is getting verified - just like not everyone goes
          around town distributing posters to coffee shops and stapling them to
          street poles, not everyone needs to be adding things to this archive.
          <br />
          We appreciate your interest and promise to get back to you quickly.
          <br />
          <br /> Please check back later or wait for an email from us!
        </p>
      </div>
    );
  }

  if (isVerified && data.allPosters.length === 0) {
    return (
      <div className="notification-wrapper">
        <p>
          Account verified! Thanks for your patience. Your contributions will
          show up here. Let's get started: <Link href="/add">add a poster</Link>
          .
        </p>
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
