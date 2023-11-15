import bcrypt from 'bcryptjs';
import mysql from 'mysql2';

const salt = bcrypt.genSaltSync(10);

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

const convertToHashPassword = (userPassword) => {
  const hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const createNewUser = (email, userPassword, username) => {
  let hashPassword = convertToHashPassword(userPassword);

  connection.query(
    `INSERT INTO Users  (email, password , username) 
        VALUES (?, ?, ?)`,
    [email, hashPassword, username],
    (err, results, fields) => {
      if (err) {
        console.log(err);
      }
      console.log(results);
    },
  );
};

const getUsersList = () => {
  connection.query(`SELECT * FROM Users`, (err, results, fields) => {
    if (err) {
      console.log(err);
    }
    console.log('check results', results);
  });
};

const userServices = { getUsersList, createNewUser, convertToHashPassword };

export default userServices;
