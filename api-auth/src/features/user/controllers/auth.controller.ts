import { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import HTTP_STATUS from '~/globals/constants/http.constant';
import { UserModel } from '../models/user.model';
import { BadRequestException } from '~/globals/cores/error.core';
import { jwtProvider } from '~/globals/providers/jwt.providers';

class AuthController {
  public async signUp(req: Request, res: Response) {
    const data = await authService.signUp(req.body);

    res.cookie('refreshToken', data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return res.status(HTTP_STATUS.OK).json({
      message: 'User created successfully',
      data: {
        accessToken: data.accessToken,
        user: data.user
      }
    });
  }

  public async signIn(req: Request, res: Response) {
    const data = await authService.signIn(req.body);

    res.cookie('refreshToken', data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return res.status(HTTP_STATUS.OK).json({
      message: 'User signed in successfully',
      data: {
        accessToken: data.accessToken,
        user: data.user
      }
    });
  }

  public async getCurrentUser(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken || '';
  }

  public async refreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken || '';

    const data = await authService.refreshToken(refreshToken);

    return res.status(HTTP_STATUS.OK).json({
      message: 'Refresh token generated successfully',
      data
    });
  }
  public async logout(req: Request, res: Response) {}

  public async private(req: Request, res: Response) {
    try {
      return res.status(HTTP_STATUS.OK).json({
        message: 'Private route accessed successfully'
      });
    } catch (error) {
      console.log('🚀 ~ AuthController ~ private ~ error:', error);
    }
  }

  public async forgotPassword(req: Request, res: Response) {
    try {
      const data = await authService.sendForgotPasswordToEmail(req.body);

      return res.status(HTTP_STATUS.OK).json({
        message: 'Forgot password link sent successfully'
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          message: error.message
        });
      } else {
        return res.status(HTTP_STATUS.INTERNAL_SERVER).json({
          message: 'Internal server error'
        });
      }
    }
  }

  public async resetPassword(req: Request, res: Response) {
    try {
      await authService.resetPassword(req.body);
      return res.status(HTTP_STATUS.OK).json({
        message: 'Password reset successfully'
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          message: error.message
        });
      } else {
        return res.status(HTTP_STATUS.INTERNAL_SERVER).json({
          message: 'Internal server error'
        });
      }
    }
  }

  public async updateProfile(req: Request, res: Response) {
    try {
      const currentUser = req.currentUser;
      const data = await authService.updateProfile(req.body, currentUser);

      return res.status(HTTP_STATUS.OK).json({
        message: 'Profile updated successfully',
        data
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          message: error.message
        });
      } else {
        return res.status(HTTP_STATUS.INTERNAL_SERVER).json({
          message: 'Internal server error'
        });
      }
    }
  }

}

export const authController: AuthController = new AuthController();
