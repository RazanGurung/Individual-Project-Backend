import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import connectDb from './database/database.js';
// define environment variables
dotenv.config();

// start connection
connectDb();

// create api server
const app = express();

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// accept json data in the body
app.use(express.json());

// make uploads folder static
// const __dirname = path.resolve(); // for es modules __dirname is only available if we're using commonjs
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

//error notification on server setup
const notFound = (req, res, next) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	next(error);
  };
  
  const errorHandler = (err, req, res, next) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	res.status(statusCode);
	res.json({
	  message: err.message,
	  stack: process.env.NODE_ENV === 'production' ? null : err.stack,
	});
  };

// custom error middleware
app.use(errorHandler);
// not found middleware
app.use(notFound);

const PORT = process.env.PORT || 5000;

app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green.bold
	)
);
export {errorHandler,notFound,}
