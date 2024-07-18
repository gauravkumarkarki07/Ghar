import express from 'express';
import { ChangePassword, UpdateProfileDetails } from '../controllers/TenantController.js';
import {VerifyToken} from '../utils/VerifyToken.js';

const router=express.Router();

router.put('/updateprofiledetails',VerifyToken,UpdateProfileDetails);
router.put('/changepassword',VerifyToken,ChangePassword);

export default router;
