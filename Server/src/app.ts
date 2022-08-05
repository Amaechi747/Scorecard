import express, { NextFunction, Request, Response } from "express";
import createError, { HttpError } from "http-errors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import mongoose from 'mongoose';

// import Debug from 'debug';
// const debug = Debug('week-9-node-task-sq011-poda-leslie-bund:server');
// import 'dotenv/config';

// mongoose.connect(<string>process.env.MONGO_URI)
// .then(() => debug('Connected to Database'))
// .catch((err) => debug('Failed to Connect to Database', err));


// Import Routes 
import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import adminRouter from "./routes/admin";

const app = express();


/***********************************************************Middleware*************************************************/
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/admin', adminRouter);
app.use('/', indexRouter);
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
  res.send(err.message);
});


/***********************************************************Middleware*************************************************/



// Export
export default app;
