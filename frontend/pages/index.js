import { useRouter } from "next/dist/client/router";
import { Posters } from "../components";

export default function Index() {
  const { query } = useRouter();
  const page = parseInt(query.page);
  return (
    <>
      <Posters page={page || 1} />
    </>
  );
}
