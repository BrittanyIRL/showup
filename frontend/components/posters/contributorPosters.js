import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Link from "next/link";
import styled from "styled-components";
import DeletePoster from "../contribute/deletePoster";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: flex-start;
`;

const Card = styled.div`
  width: 20%;
  height: 375px;
  margin: 1rem 0.5rem;
  display: flex;
  flex-direction: column;

  img {
    height: 275px;
    width: auto;
    object-fit: cover;
    border-top: ${({ theme }) => `12px solid ${theme.colors.brown}`};
    border-bottom: ${({ theme }) => `12px solid ${theme.colors.brown}`};
  }
  p {
    height: 75px;
    margin: 0;
  }
`;

const Updates = styled.div`
  height: 25px;
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
`;

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
    <Container>
      {data.allPosters.map((poster) => (
        <Card key={poster.id}>
          <img src={poster.image.image.publicUrlTransformed} />
          <p>
            {poster.headliner} with {poster.supportingActs} at {poster.venue}
            on {poster.date}
          </p>

          <Updates>
            <Link href={`/poster/${poster.id}`}>Edit</Link>
            <DeletePoster id={poster.id} />
          </Updates>
        </Card>
      ))}
    </Container>
  );
}
