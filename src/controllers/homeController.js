import mysql from 'mysql2';

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  port: 3308,
  database: 'leaningIT',
  password: '123456',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

const handleHelloWorld = (req, res) => {
  return res.render('home.ejs');
};

const handleUsersPage = (req, res) => {
  return res.render('users.ejs');
};

const handleCreateUser = async (req, res) => {
  const { email, password, username } = req.body;

  // let [results, fields] = await connection.query(
  //   `INSERT INTO Users  (email, password , username)
  // VALUES (?, ?, ?)`,
  //   [email, password, username],
  // );

  connection.query(
    `INSERT INTO Users  (email, password , username) 
    VALUES (?, ?, ?)`,
    [email, password, username],
    function (err, results, fields) {
      if (err) {
        console.log(err);
      }
      console.log(results);
    },
  );
  return res.send('handleCreateUser');
};

module.exports = { handleHelloWorld, handleUsersPage, handleCreateUser };
