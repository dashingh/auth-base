import express from 'express';

import asyncWrapper from '~/globals/cores/asyncWrapper.core';
import { permissionController } from '../controllers/permission.controller';

const permissionRoute = express.Router();

permissionRoute.post('/seed-data', asyncWrapper(permissionController.seedData));

export default permissionRoute;
