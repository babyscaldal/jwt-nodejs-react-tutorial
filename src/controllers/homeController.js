import userServices from '../services/userServices';

const handleHelloWorld = (req, res) => {
  return res.render('home.ejs');
};

const handleUsersPage = async (req, res) => {
  let usersList = await userServices.getUsersList();
  console.log('check userList:', usersList);

  return res.render('users.ejs', { users: usersList });
};

const handleCreateUser = async (req, res) => {
  const { email, password, username } = req.body;

  await userServices.createNewUser(email, password, username);
  return res.redirect('/users');
};

module.exports = { handleHelloWorld, handleUsersPage, handleCreateUser };
