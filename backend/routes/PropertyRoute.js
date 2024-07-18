import express from 'express';
import { CreateProperty, DeleteProperty, GetAllProperties, GetLandlordProperty, GetPropertyById, GetSavedProperties, SaveProperty, UpdateProperty } from '../controllers/PropertyController.js';
import {VerifyToken} from '../utils/VerifyToken.js';

const router=express.Router();

router.get('/properties',GetAllProperties);
router.get('/propertydetails/:propertyId',VerifyToken,GetPropertyById);
router.get('/savedproperties',VerifyToken,GetSavedProperties);
router.get('/listedproperties',VerifyToken,GetLandlordProperty);

router.post('/listnewproperty',VerifyToken,CreateProperty);

router.put('/saveproperty/:propertyId',VerifyToken,SaveProperty);
router.put('/updateproperty/:propertyId',VerifyToken,UpdateProperty);

router.delete('/deleteproperty/:propertyId',VerifyToken,DeleteProperty);



export default router;
