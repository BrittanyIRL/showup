import Link from "next/link";
import ContributorPosters from "../components/posters/contributorPosters";

export default function Account() {
  return (
    <div>
      Inside Account - Display posters created by this user. Below poster
      instances show 'edit' and 'delete'
      <Link href="/add">Add new show</Link>
      <ContributorPosters />
    </div>
  );
}
