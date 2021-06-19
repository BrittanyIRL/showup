import { EditPoster } from "../components";

export default function UpdatePoster({ query }) {
  console.log(query);
  return (
    <div>
      <EditPoster id={query.id} />
    </div>
  );
}
