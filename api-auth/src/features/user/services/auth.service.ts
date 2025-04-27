import { BadRequestException } from '~/globals/cores/error.core';
import { UserModel } from '../models/user.model';

import bcrypt from 'bcrypt';
import { jwtProvider } from '~/globals/providers/jwt.providers';
import crypto from 'crypto';
import { mailProvider } from '~/globals/providers/mail.provider';
import { RoleModel } from '~/features/role/models/role.model';

class AuthService {
  public async signUp(requestBody: any) {
    const { email, password } = requestBody;

    const user = await UserModel.findOne({
      email
    });

    if (user) {
      throw new BadRequestException('User already exists!');
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const teacherRole = await RoleModel.findOne({ name: 'teacher' });

      if (!teacherRole) {
        throw new BadRequestException('Role not found!');
      }

      const newUser = new UserModel({
        ...requestBody,
        password: hashedPassword
      });
      newUser.roles = [teacherRole];

      await newUser.save();

      const roles = newUser.roles.map((item) => item.name);

      const jwtPayload = {
        _id: newUser._id.toString(),
        email: newUser.email,
        name: newUser.name,
        roles
      };

      const accessToken = await jwtProvider.generateJwt(jwtPayload);
      const refreshToken = await jwtProvider.generateRefreshToken(jwtPayload);

      return {
        refreshToken,
        accessToken,
        user: jwtPayload
      };
    }
  }

  public async signIn(requestBody: any) {
    const { email, password } = requestBody;

    const user = await UserModel.findOne({
      email
    }).populate('roles');

    if (!user) {
      throw new BadRequestException('User not found!');
    } else {
      const roles = user.roles?.map((item) => item.name) ?? [];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new BadRequestException('Email or Password is incorrect!');
      } else {
        const jwtPayload = {
          _id: user._id.toString(),
          email: user.email,
          name: user.name,
          roles
        };

        const accessToken = await jwtProvider.generateJwt(jwtPayload);
        const refreshToken = await jwtProvider.generateRefreshToken(jwtPayload);

        return {
          refreshToken,
          accessToken,
          user: jwtPayload
        };
      }
    }
  }

  public async refreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw new BadRequestException('Refresh token not found');
    }

    const userDecoded = await jwtProvider.verifyRT(refreshToken);
    if (!userDecoded) {
      throw new BadRequestException('Invalid refresh token');
    }

    const user = await UserModel.findById(userDecoded._id).populate('roles');

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const roles = user?.roles?.map((item) => item.name) ?? [];

    const jwtPayload = {
      _id: user._id.toString(),
      email: user.email,
      name: user.name,
      roles
    };
    const accessToken = await jwtProvider.generateJwt(jwtPayload);

    return accessToken;
  }

  public async sendForgotPasswordToEmail(requestBody: { email: string }) {
    const { email } = requestBody;

    const user = await UserModel.findOne({
      email
    });

    if (!user) {
      throw new BadRequestException('User not found!');
    }

    const resetPasswordToken = crypto.randomBytes(10).toString('hex');
    const resetPasswordExpired = Date.now() + 10 * 1000 * 60; // 10 min
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpired = resetPasswordExpired;
    await user.save();

    const resetPasswordLink = `http://localhost:3000/reset-password?token=${resetPasswordToken}&email=${email}`;

    const mailContent = `
      <h1>Reset Password</h1>
      <p>Click the link below to reset your password:</p>
      <a href="${resetPasswordLink}" target="_blank" >Reset Password</a>`;

    // Send email to user with resetPasswordToken
    await mailProvider.sendMail({
      to: email,
      subject: 'Reset Password',
      text: mailContent
    });
  }

  public async resetPassword(requestBody: any) {
    const { email, password, resetPasswordToken } = requestBody;

    const user = await UserModel.findOne({
      email,
      resetPasswordToken
    });

    if (!user) {
      throw new BadRequestException('User not found!');
    }

    if (!user.resetPasswordExpired || Date.now() > user.resetPasswordExpired) {
      throw new BadRequestException('Reset password token expired!');
    }

    user.password = await bcrypt.hash(password, 10);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpired = undefined;
    await user.save();
  }

  public async updateProfile(requestBody: any, currentUser: UserPayload) {
    const { name } = requestBody;
    const userId = currentUser?._id;
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new BadRequestException('User not found!');
    }
    user.name = name;

    await user.save();
  }
}

export const authService: AuthService = new AuthService();
