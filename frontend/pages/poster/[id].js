import { EditPoster } from "../../components";

const SinglePosterPage = ({ query }) => {
  return (
    <>
      <EditPoster id={query.id} />
    </>
  );
};

export default SinglePosterPage;
