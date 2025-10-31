import express from 'express'
import {authController} from '../controller/authController.js';
import { verifyController, cookieController ,logoutController,updateController,getProfileController} from '../controller/verifyController.js';
import { signatureCreation } from '../helper/signatureCreation.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';
const router=express.Router();

router.post('/login',authController)
router.post('/verify',verifyController)
router.post('/create',signatureCreation)
router.get('/me',cookieController)
router.post('/logout',isAuthenticated,logoutController)
router.patch('/update',isAuthenticated,updateController)
router.get('/profile',isAuthenticated,getProfileController)

export default router