import { EditPoster } from "../../components";

const SinglePosterPage = ({ query }) => {
  return (
    <div className="form-page">
      <EditPoster id={query.id} />
    </div>
  );
};

export default SinglePosterPage;
