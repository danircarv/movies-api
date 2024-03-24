function ensureAuth(request, response, next) {
  console.log("Você passou pelo middleware");

  next();
}

module.exports = ensureAuth;
