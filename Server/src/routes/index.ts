import express, { NextFunction, Request, Response } from "express";

import { loginSuperAdmin } from '../controllers/authentication';
const router = express.Router();

/* GET home page. */



router.get('/login', loginSuperAdmin);






import superAdminRoute from "../controllers";

/* GET home page. */
router.post('/admin/superuser', superAdminRoute);




export default router;
