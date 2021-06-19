import React from "react";

import PropTypes from "prop-types";

const ErrorMessage = ({ error }) => {
  if (!error || !error.message) return null;
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error, i) => (
      <div key={i}>{error.message.replace("GraphQL error: ", "")}</div>
    ));
  }
  return <>{error.message.replace("GraphQL error: ", "")}</>;
};

ErrorMessage.defaultProps = {
  error: {},
};

ErrorMessage.propTypes = {
  error: PropTypes.object,
};

export default ErrorMessage;
