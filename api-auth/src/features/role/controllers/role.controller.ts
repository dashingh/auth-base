import { Request, Response } from 'express';

import HTTP_STATUS from '~/globals/constants/http.constant';
import { roleServices } from '../services/role.services';

 

class RoleController {
  public async seedData(req: Request, res: Response) {
    const data = await roleServices.seedData();

    return res.status(HTTP_STATUS.OK).json({
      message: 'Seed data successfully'
    });
  }
}

export const roleController: RoleController = new RoleController();
