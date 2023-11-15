import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';

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

const createNewUser = async (email, userPassword, username) => {
  let hashPassword = convertToHashPassword(userPassword);

  try {
    const [results, fields] = await connection.query(
      `INSERT INTO Users  (email, password , username) 
          VALUES (?, ?, ?)`,
      [email, hashPassword, username],
    );
  } catch (error) {
    console.log('check error:', error);
  }
};

const getUsersList = async () => {
  try {
    const [results, fields] = await connection.query(`SELECT * FROM Users`);
    console.log('check result:', results);
    return results;
  } catch (error) {
    console.log('check error:', error);
  }
};

const deleteUser = async (userId) => {
  try {
    const [results, fields] = await connection.query(
      `DELETE FROM Users WHERE id = ?`,
      [userId],
    );
    console.log('check result:', results);
    return results;
  } catch (error) {
    console.log('check error:', error);
  }
};

const updateUserInfo = async (email, username, userId) => {
  try {
    const [results, fields] = await connection.query(
      `
      UPDATE Users
      SET email = ?, username = ?
      WHERE id = ?`,
      [email, username, userId],
    );
    console.log('check result:', results);
    return results;
  } catch (error) {
    console.log('check error:', error);
  }
};

const getUserById = async (userId) => {
  try {
    const [results, fields] = await connection.query(
      `SELECT * FROM Users WHERE id = ?`,
      [userId],
    );
    console.log('check result:', results);
    return results;
  } catch (error) {
    console.log('check error:', error);
  }
};

const userServices = {
  getUserById,
  deleteUser,
  getUsersList,
  createNewUser,
  convertToHashPassword,
  updateUserInfo,
};

export default userServices;
