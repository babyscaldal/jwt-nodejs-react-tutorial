const handleHelloWorld = (req, res) => {
  return res.render('home.ejs');
};

const handleUsersPage = (req, res) => {
  return res.render('users.ejs');
};

module.exports = { handleHelloWorld, handleUsersPage };
