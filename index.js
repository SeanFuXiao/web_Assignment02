// #!/usr/bin/env node
// const bodyParser = require('body-parser');
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();

// // MongoDB connection string
// // For local MongoDB: 'mongodb://localhost:27017/Marketplace'
// // If using MongoDB Atlas, replace with the connection URI provided by Atlas
const MONGODB_URI = 'mongodb+srv://fuxiao0928:19870928@cluster0.whst5y5.mongodb.net/';

// // Connect to MongoDB
// mongoose.connect(MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => {
//     console.log('Connected to MongoDB successfully!');
// })
// .catch((error) => {
//     console.error('Error connecting to MongoDB:', error.message);
// });

// app.use(cors());
// app.use(express.json());

// /**
//  * Module dependencies.
//  */

// var debug = require('debug')('assignment:server');
// var http = require('http');

// /**
//  * Get port from environment and store in Express.
//  */

// var port = normalizePort(process.env.PORT || '3000');
// app.set('port', port);

// // Middleware
// app.use(bodyParser.json());
// // Routes
// const apiRoutes = require('./routes/api');
// app.use('/api/products/', apiRoutes);

// /**
//  * Create HTTP server.
//  */

// var server = http.createServer(app);

// /**
//  * Listen on provided port, on all network interfaces.
//  */

// server.listen(port);
// server.on('error', onError);
// server.on('listening', onListening);

// /**
//  * Normalize a port into a number, string, or false.
//  */

// function normalizePort(val) {
//   var port = parseInt(val, 10);

//   if (isNaN(port)) {
//     // named pipe
//     return val;
//   }

//   if (port >= 0) {
//     // port number
//     return port;
//   }

//   return false;
// }

// /**
//  * Event listener for HTTP server "error" event.
//  */

// function onError(error) {
//   if (error.syscall !== 'listen') {
//     throw error;
//   }

//   var bind = typeof port === 'string'
//     ? 'Pipe ' + port
//     : 'Port ' + port;

//   // handle specific listen errors with friendly messages
//   switch (error.code) {
//     case 'EACCES':
//       console.error(bind + ' requires elevated privileges');
//       process.exit(1);
//       break;
//     case 'EADDRINUSE':
//       console.error(bind + ' is already in use');
//       process.exit(1);
//       break;
//     default:
//       throw error;
//   }
// }

// /**
//  * Event listener for HTTP server "listening" event.
//  */

// function onListening() {
//   var addr = server.address();
//   var bind = typeof addr === 'string'
//     ? 'pipe ' + addr
//     : 'port ' + addr.port;
//   debug('Listening on ' + bind);
// }

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// const config = require('./config');

// MongoDB connection
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

// Middleware
app.use(bodyParser.json());

// Routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});