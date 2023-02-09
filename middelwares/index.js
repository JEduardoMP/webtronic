const globalErrorHandler = (err, req, res, next) => {
  if (err.status === 400) {
    res.status(400).send(JSON.stringify({message: 'Bad request.'}));
  } else if (err.status === 401) {
    res.status(401).send(JSON.stringify({message: 'Unauthorized.'}));
  } else if (err.status === 404) {
    res.status(404).send(JSON.stringify({message: 'NotUnauthorized found.'}));
  } else if (err.status === 500) {
    res.status(500)
        .send(JSON.stringify({message: 'Internal server error.'}));
  }
};

module.exports = {
  globalErrorHandler,
};
