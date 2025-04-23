import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const authorize = (role) => {
  return async (req, res, next) => {
    try {
      const userId = req.body.user;

      if (!userId) {
        return res
          .status(401)
          .json({ message: "Unauthorized: User not authenticated" });
      }

      const user = await User.findById(userId);

      if (!user) {
        return res
          .status(401)
          .json({ message: "Unauthorized: User not found" });
      }

      if (user.role !== role) {
        return res.status(403).json({ message: `Forbidden: ${role}s Only` });
      }

      next();
    } catch (error) {
      return res.status(500).json({ message: "Error checking user role" });
    }
  };
};
