import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

export const ALL_POSTERS_QUERY = gql`
  query ALL_POSTERS_QUERY {
    allPosters {
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

export default function Posters() {
  const { data, error, loading } = useQuery(ALL_POSTERS_QUERY);
  if (loading) {
    return <p>{loading}</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  console.log("data", { data });
  return <div>more shit</div>;
}
