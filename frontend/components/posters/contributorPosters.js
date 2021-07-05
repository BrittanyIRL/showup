import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Link from "next/link";
import { useUser } from "../authentication";
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
  const user = useUser();
  console.log("//// ", user);
  const { data, error, loading } = useQuery(CONTRIBUTOR_POSTERS_QUERY, {
    variables: { userId: user?.id || null },
  });
  console.log("??? ", { data });
  if (loading) {
    return <p>{loading}</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  console.log("data", { data });
  return data.allPosters.map((poster) => (
    <div key={poster.id}>
      <p>{poster.headliner}</p>
      <p>{poster.date}</p>
      <p>{poster.venue}</p>
      <Link href={`/poster/${poster.id}`}>Edit</Link>
      <DeletePoster id={poster.id} />
    </div>
  ));
}
