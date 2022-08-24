import express, { NextFunction, Request, Response } from "express";
import createError, { HttpError } from "http-errors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors"
import "dotenv/config"
// import dotenv from 'dotenv';
// const dotEnv = dotenv.config();

// Import Routes 
import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import adminRouter from "./routes/admin";
import recoveryRouter from "./routes/recovery"


export const app = express();


/***********************************************************Middleware*************************************************/
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/admin', adminRouter);
app.use('/', indexRouter);
app.use('/recover', recoveryRouter)
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function(err: HttpError, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  // render the error page
  res.status(err.status || 500);
  res.send({error: err.message});
});
/***********************************************************Middleware*************************************************/



// Export
export default app;
