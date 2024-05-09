// Import the Express module
import express, { urlencoded, json } from "express";

// Import the CORS module
import cors from 'cors';

// Import the routes
import homeRoutes from './routes/home.js';
import agentRoutes from './routes/agent.js';

// Create an Express application
const app = express();

app.use(urlencoded({ extended: false }));
app.use(json());

// Use the CORS module
app.use(cors());

// Use the routes module
app.use('/', homeRoutes);
app.use('/api/agents', agentRoutes);


app.use((req, res, next) => {
  next(
    res.status(404).json({
      msg: "404 route not found",
    }),
  );
});

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
