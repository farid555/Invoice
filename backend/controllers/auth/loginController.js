import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../../models/userModel.js';
import { systemLogs } from '../../utils/Logger.js';

// $-title Login User, get access and refresh tokens
// $-path  post /api/v1/auth/login
// $-auth  Public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    res.status(400);
    throw new Error('Please provide an email and password');
  }
  if (!password) {
    res.status(400);
    throw new Error('Please provide an email and password');
  }

  const existingUser = await User.findOne({ email }).select('+password');

  if (!existingUser) {
    res.status(401);
    systemLogs.error('Incorrect email or password');
    throw new Error('Incorrect email or password');
  }

  const comparepass = await existingUser.comparePassword(password);

  if ( !comparepass) {
    res.status(401);
    systemLogs.error('Incorrect email or password');
    throw new Error('Incorrect email or password');
  }

  if (!existingUser.isEmailVerified) {
    res.status(400);
    throw new Error(
      'You are not verified. Check your email, a verification eamil link was sent when you registered'
    );
  }

  if (!existingUser.active) {
    res.status(400);
    throw new Error(
      'You have been deactived by the admin and loging is impossible. Contact us for enquiries'
    );
  }

  if (existingUser && comparepass) {
    const accessToken = jwt.sign(
      {
        id: existingUser._id,
        roles: existingUser.roles,
      },
      process.env.JWT_ACCESS_SECRET_KEY,
      { expiresIn: '10h' }
    );

    const newRefreshToken = jwt.sign(
      {
        id: existingUser._id,
      },
      process.env.JWT_REFRESH_SECRET_KEY,
      { expiresIn: '10d' }
    );

    const cookies = req.cookies;

    let newRefreshTokenArray = !cookies?.jwt
      ? existingUser.refreshToken
      : existingUser.refreshToken.filter((reft) => reft != cookies.jwt);

  

    if (cookies?.jwt) {
      const refreshToken = cookies.jwt;
      const existingRefreshToken = await User.findOne({ refreshToken }).exec();

      if (!existingRefreshToken) {
        newRefreshTokenArray = [];
      }

      const options = {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: 'None',
      };

      res.clearCookie('jwt', options);
    }

    existingUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];

    existingUser.save();

    const options = {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: 'None',
    };

    res.cookie('jwt', newRefreshToken, options);

    res.json({
      sucess: true,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      username: existingUser.username,
      provider: existingUser.provider,
      avatar: existingUser.avatar,
      accessToken,
    });
  } else {
    res.status(401);
    throw new Error('Invalid credentials provided');
  }
});

export default loginUser;
