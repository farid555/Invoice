import asyncHandler from 'express-async-handler';
import User from '../../models/userModel.js';
import { systemLogs } from '../../utils/Logger.js';

//$-title  Get All Users
//$-path   Get /api/v1/user/all
//$-auth   Private

const getAllUserAccounts = asyncHandler(async (req, res) => {
  const pageSize = 10;

  const page = Number(req.query.pasgNumber) || 1;

  const count = await User.countDocuments({});

  const users = await User.find()
    .sort({ createdAt: -1 })
    .select('-refreshToken')
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .lean();

  res.json({
    success: true,
    count,
    numberOfPages: Math.ceil(count / pageSize),
    users,
  });
});

export default getAllUserAccounts;
