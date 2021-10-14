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
      <p key={i} className="form-error">
        {error.message.replace("GraphQL error: ", "")}
      </p>
    ));
  }
  return (
    <p className="form-error">{error.message.replace("GraphQL error: ", "")}</p>
  );
};

ErrorMessage.defaultProps = {
  error: {},
};

ErrorMessage.propTypes = {
  error: PropTypes.object,
};

export default ErrorMessage;
