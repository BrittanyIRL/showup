import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Link from "next/link";
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

export default function ContributorPosters({ isVerified, userId }) {
  const { data, error, loading } = useQuery(CONTRIBUTOR_POSTERS_QUERY, {
    variables: { userId: userId || null },
  });
  console.log("??? ", { data });
  if (loading) {
    return <p>{loading}</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  if (!isVerified) {
    return <p>You're account is getting verified, please check back later.</p>;
  }

  console.log("data", { data });
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
