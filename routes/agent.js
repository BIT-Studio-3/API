// Import the Express module
import express from "express";

// Import the index controllers module
import * as resources from "../controllers/agent.js";

// Create an Express router
const router = express.Router();

// Create a POST route
router.post("/", resources.register);

// Create a GET route
router.get("/", (req, res) => resources.getAgents(req, res));

// Export the router
export default router;
