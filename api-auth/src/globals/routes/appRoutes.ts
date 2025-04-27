import { Application } from 'express';
import permissionRoute from '~/features/permission/routes/permission.route';
import roleRoute from '~/features/role/routes/role.route';
import { roleServices } from '~/features/role/services/role.services';
import authRoute from '~/features/user/routes/auth.route';

function appRoutes(app: Application) {
  app.use('/api/v1/auth', authRoute);
  app.use('/api/v1/permission', permissionRoute);
  app.use('/api/v1/role', roleRoute);
}

export default appRoutes;
