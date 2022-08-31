import express from "express";
import superAdminRoute from "../controllers";

import { loginSuperAdmin } from '../controllers/authentication';
const router = express.Router();

/* GET home page. */



router.get('/login', loginSuperAdmin);







/* GET home page. */
router.post('/admin/superuser', superAdminRoute);




export default router;
