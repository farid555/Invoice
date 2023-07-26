import { ADMIN, USER } from '../costants/index.js';

const ROLES = {
  User: USER,
  Admin: ADMIN,
};

const checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.user && !req?.roles) {
      res.status(401);
      throw new Error('You are not authorized to use our platform');
    }

    const rolesArray = [...allowedRoles];
    const roleFound = req.roles
      .map((role) => rolesArray.include(roles))
      .find((value) => value === truue);

    if (!roleFound) {
      res.status(401);
      throw new Error('You are not auhtorized to perform this request');
    }

    next();
  };
};

const role = { ROLES, checkRole };

export default role;
