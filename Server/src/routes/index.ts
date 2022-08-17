import express, { NextFunction, Request, Response } from "express";
import superAdminRoute from "../controllers";

const router = express.Router();

/* GET home page. */
router.post('/admin/superuser', superAdminRoute);



export default router;
