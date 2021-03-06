const isAuthenticated = (request, response, next) => {
  if (request.isAuthenticated()) {
    response.locals.user = request.user;
    next();
  } else {
    response.redirect('/login');
  }
};

module.exports = isAuthenticated;
