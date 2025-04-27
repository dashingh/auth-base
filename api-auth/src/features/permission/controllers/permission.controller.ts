import { Request, Response } from 'express';

import HTTP_STATUS from '~/globals/constants/http.constant';

import { permissionServices } from '../services/permission.services';

class PermissionController {
  public async seedData(req: Request, res: Response) {
    const data = await permissionServices.seedData();

    return res.status(HTTP_STATUS.OK).json({
      message: 'Seed data successfully'
    });
  }
}

export const permissionController: PermissionController = new PermissionController();
