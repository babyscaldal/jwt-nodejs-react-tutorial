import express from 'express';
import homeController from '../controllers/homeController';

const router = express.Router();

/**
 *
 * @param {*} app : express app
 */

const initWebRoutes = (app) => {
  router.get('/', homeController.handleHelloWorld);
  router.get('/users', homeController.handleUsersPage);
  router.post('/users/create-user', homeController.handleCreateUser);
  router.get('/delete-user/:userId', homeController.handleDeleteUser);
  router.get('/update-user/:userId', homeController.getUpdateUserPage);
  router.post('/users/update-user', homeController.handleUpdateUser);
  return app.use('/', router);
};

export default initWebRoutes;
