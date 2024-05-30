import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getWaypoints = async (req, res) => {
  try {
    //fetch all waypoints from the database
    const waypoints = await prisma.waypoint.findMany({
      include: { 
        traits: true,
        shipyard: true,
        destinations: true,
      },
    });

    //if no waypoints are found return a 404 error
    if (waypoints.length === 0) {
      return res.status(404).json({ msg: "No waypoints found" });
    }

    //If waypoints are found, return a 200 success response with the waypoints data
    return res
      .status(200)
      .json({ msg: "Successfully fetched all waypoints", data: waypoints });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};
export { getWaypoints };
