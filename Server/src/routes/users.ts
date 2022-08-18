import express, { Request, Response, NextFunction } from "express";
import { verifyDecadev , getCurrentPerformance } from "../controllers/decadevController";
const router = express.Router();

/* GET users listing. */
router.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.send('respond with a resource');
});

router.get('/get_current_performance/:id', getCurrentPerformance)
/* Verify Decadev */
router.get('/verify', verifyDecadev);

export default router;
