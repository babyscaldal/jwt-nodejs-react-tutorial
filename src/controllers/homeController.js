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

const handleDeleteUser = async (req, res) => {
  const selectedUserId = req.params.userId;
  await userServices.deleteUser(selectedUserId);
  return res.redirect('/users');
};

const getUpdateUserPage = async (req, res) => {
  const selectedUserId = req.params.userId;
  let user = await userServices.getUserById(selectedUserId);

  let userData = {};
  if (user && user.length > 0) {
    userData = user[0];
  }

  return res.render('userUpdate.ejs', { userData });
};

const handleUpdateUser = async (req, res) => {
  const { email, username, id } = req.body;
  console.log('check req:', req.body);
  await userServices.updateUserInfo(email, username, id);
  return res.redirect('/users');
};

module.exports = {
  handleHelloWorld,
  handleUsersPage,
  handleCreateUser,
  handleDeleteUser,
  getUpdateUserPage,
  handleUpdateUser,
};
