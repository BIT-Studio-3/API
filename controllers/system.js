import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * Retrieves all systems in the database and returns the system objects
 */
const getSystems = async (req, res) => {
  try {
    // Extract query filters if any
    const filters = req.query.filters ? JSON.parse(req.query.filters) : {};

    // Order by whatever the user specifies
    const orderBy = req.query.orderBy;

    // Change query to include filters, order, and waypoint objects
    const query = {
      where: filters,
      orderBy: orderBy ? JSON.parse(orderBy) : undefined,
      include: { waypoints: true },
    };

    // fetch all systems from the database
    const systems = await prisma.system.findMany(query);

    //if no systems are found return a 404 error
    if (systems.length === 0) {
      return res.status(404).json({ msg: "No systems found" });
    }
    //If systems are found, return a 200 success response with the systems data
    return res
      .status(200)
      .json({ msg: "Successfully fetched all systems", data: systems });

    // Handle errors by returning a 500 error with the error message
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};
export { getSystems };
