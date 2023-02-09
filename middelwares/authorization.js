const handleAuthorization = (req, res, next) => {
  const {token, user} = req.headers;
  if (token === 'ABCD', user === 'U1') next();
};

module.exports = {handleAuthorization};
