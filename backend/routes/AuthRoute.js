import express from 'express';
import { GoogleSignIn, GoogleSignInLandlord, LoginLandlord, LoginTenant, Logout, RegisterLandlord, RegisterTenant } from '../controllers/AuthController.js';

const router=express.Router();

router.post('/registertenant',RegisterTenant);
router.post('/registerlandlord',RegisterLandlord);
router.post('/logintenant',LoginTenant);
router.post('/googlesignin',GoogleSignIn);
router.post('/googlesigninlandlord',GoogleSignInLandlord);
router.post('/loginlandlord',LoginLandlord);
router.post('/logout',Logout);

export default router;

