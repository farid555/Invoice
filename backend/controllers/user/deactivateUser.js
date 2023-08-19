import asyncHandler from 'express-async-handler';
import User from '../../models/userModel.js';
import { systemLogs } from '../../utils/Logger.js';

//$-title  Deactivate User Account
//$-path   DELETE /api/v1/user/:id/deactivate
//$-auth   Private

const deactivateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.active = false;

    const updatedUser = await user.save();

    res.json({
      updatedUser,
    });
  } else {
    res.status(404);
    throw new Error('User was not found');
  }
});

export default deactivateUser;
