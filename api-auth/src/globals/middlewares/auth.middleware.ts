import { NextFunction, Request, Response } from 'express';
import { BadRequestException, UnAuthorizedException } from '../cores/error.core';
import { jwtProvider } from '../providers/jwt.providers';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

class AuthMiddleware {
  public async verifyUser(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!req.headers.authorization || !token) {
      return res.status(401).json({
        message: 'Unauthorized',
        status: false
      });
    }

    try {
      const decodedUser = await jwtProvider.verifyJwt(token);

      req.currentUser = {
        _id: decodedUser._id,
        email: decodedUser.email,
        name: decodedUser.name,
        roles: decodedUser.roles
      };

      next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return res.status(403).json({
          message: 'Token expired',
          status: false
        });
      }
      if (error instanceof JsonWebTokenError) {
        return res.status(401).json({
          message: 'Token invalid',
          status: false
        });
      }
      return res.status(401).json({
        message: 'please login again',
        status: false
      });
    }
  }
}

export const authMiddleware: AuthMiddleware = new AuthMiddleware();
