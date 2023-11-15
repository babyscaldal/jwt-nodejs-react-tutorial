import userServices from '../services/userServices';

const handleHelloWorld = (req, res) => {
  return res.render('home.ejs');
};

const handleUsersPage = (req, res) => {
  return res.render('users.ejs');
};

const handleCreateUser = async (req, res) => {
  const { email, password, username } = req.body;

  // userServices.createNewUser(email, password, username);
  userServices.getUsersList();
  return res.send('handleCreateUser');
};

module.exports = { handleHelloWorld, handleUsersPage, handleCreateUser };
