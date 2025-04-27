import express from 'express';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';
import { authController } from '../controllers/auth.controller';
import { authMiddleware } from '~/globals/middlewares/auth.middleware';

const authRoute = express.Router();

authRoute.post('/signup', asyncWrapper(authController.signUp));
authRoute.get('/refreshtoken', asyncWrapper(authController.refreshToken));
authRoute.post('/sign-in', asyncWrapper(authController.signIn));
authRoute.get('/me', asyncWrapper(authController.getCurrentUser));
authRoute.post('/logout', asyncWrapper(authController.logout));
authRoute.post('/forgot-password', asyncWrapper(authController.forgotPassword));
authRoute.post('/reset-password', asyncWrapper(authController.resetPassword));
authRoute.post('/update-profile', authMiddleware.verifyUser, asyncWrapper(authController.updateProfile));
authRoute.get('/private', authMiddleware.verifyUser, asyncWrapper(authController.private));

export default authRoute;
