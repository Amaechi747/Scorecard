import express, { Request, Response, NextFunction } from "express";
import { verifyDecadev } from "../controllers/decadevController";

const router = express.Router();

/* GET users listing. */
router.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.send('respond with a resource');
});


/* Verify Decadev */
router.get('/verify', verifyDecadev);


export default router;
