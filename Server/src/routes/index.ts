import express, { NextFunction, Request, Response } from "express";
import { loginSuperAdmin } from '../controllers/authentication';
const router = express.Router();

/* GET home page. */



router.get('/login', loginSuperAdmin);








export default router;
