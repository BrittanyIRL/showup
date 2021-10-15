import { EditPoster } from "../../components";

const SinglePosterPage = ({ query }) => {
  return (
    <div className="one-column-grid">
      <EditPoster id={query.id} />
    </div>
  );
};

export default SinglePosterPage;
