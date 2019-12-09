import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import FileController from './app/controllers/FileController';

import UserController from './app/controllers/UserController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/users', UserController.store);

export default routes;
