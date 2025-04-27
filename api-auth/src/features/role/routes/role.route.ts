import express from 'express';

import asyncWrapper from '~/globals/cores/asyncWrapper.core';
 
import { roleController } from '../controllers/role.controller';

const roleRoute = express.Router();

roleRoute.post('/seed-data', asyncWrapper(roleController.seedData));

export default roleRoute;
