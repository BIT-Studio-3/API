// Import the Express module
import express, { urlencoded, json } from "express";

// Import the CORS module
import cors from 'cors';

// Import the routes
import agentRoutes from './routes/agent.js';
import contractRoutes from './routes/contract.js';
import locationRoutes from './routes/location.js';
import authRoutes from './routes/auth.js';
import authRouteMiddleware from "./middleware/authRoute.js";

// Create an Express application
const app = express();

app.use(urlencoded({ extended: false }));
app.use(json());

// Use the CORS module
app.use(cors());

// Use the routes module
app.use('/api/agents', authRouteMiddleware, agentRoutes);
app.use('/api/contracts', authRouteMiddleware, contractRoutes);
app.use('/api/location', locationRoutes); //add auth
app.use('/api/auth', authRoutes);


// Sets 404 error message if request contains an invalid route and sends to next middleware function in the stack
app.use((req, res, next) => {
  next(
    res.status(404).json({
      msg: "404 route not found",
    }),
  );
});

// Displays a written error message depending on the error found
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server is listening on port 3000.');
});

// Export the Express application. May be used by other modules. For example, API testing
export default app;
