import Head from "next/head";
import { EditPoster } from "../../components";

const SinglePosterPage = ({ query }) => {
  return (
    <>
      <Head>
        <title>Edit</title>
      </Head>
      <div className="one-column-grid">
        <EditPoster id={query.id} />
      </div>
    </>
  );
};

export default SinglePosterPage;
