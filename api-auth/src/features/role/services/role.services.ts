import { PermissionModel } from '~/features/permission/models/permission.model';
import { RoleModel } from '../models/role.model';

class RoleService {
  public async seedData() {
    const p1 = await PermissionModel.findOne({ name: 'VIEW_DASHBOARD' });
    const p2 = await PermissionModel.findOne({ name: 'VIEW_PROFILE' });
    const p3 = await PermissionModel.findOne({ name: 'ADD_CLASS' });
    const p4 = await PermissionModel.findOne({ name: 'DELETE_CLASS' });
    const p5 = await PermissionModel.findOne({ name: 'VIEW_CLASS' });

    const r1 = new RoleModel({
      name: 'admin'
    });

    r1.permissions = [p1, p2, p3, p4, p5].filter(
      (permission): permission is NonNullable<typeof permission> => permission !== null
    );

    const r2 = new RoleModel({
      name: 'manager'
    });

    r2.permissions = [p2, p3, p4, p5].filter(
      (permission): permission is NonNullable<typeof permission> => permission !== null
    );

    const r3 = new RoleModel({
      name: 'teacher'
    });

    r3.permissions = [p3, p4, p5].filter(
      (permission): permission is NonNullable<typeof permission> => permission !== null
    );

    [r1, r2, r3].forEach(async (role) => await role.save());
  }
}
export const roleServices: RoleService = new RoleService();
