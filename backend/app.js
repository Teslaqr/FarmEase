// const express = require('express');
// const morgan = require('morgan');
// const colors = require('colors');
// const cookieParser = require('cookie-parser');
// const errorHandler = require('./middlewares/error');
// const connectDB = require('./config/db');

// // Route files
// const auth = require('./routes/authRoutes');
// const equipment = require('./routes/equipmentRoutes');
// const rentals = require('./routes/rentalRoutes');

// // Connect to database
// connectDB();

// const app = express();

// // Body parser
// app.use(express.json());

// // Cookie parser
// app.use(cookieParser());

// // Dev logging middleware
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }

// // Mount routers
// app.use('/api/v1/auth', auth);
// app.use('/api/v1/equipment', equipment);
// app.use('/api/v1/rentals', rentals);

// // Error handler middleware
// app.use(errorHandler);

// module.exports = app;