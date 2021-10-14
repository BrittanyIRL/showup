import { useRouter } from "next/router";
import { useUser } from "../components";
import ContributorPosters from "../components/posters/contributorPosters";

export default function Account() {
  return <ContributorPosters />;
}
