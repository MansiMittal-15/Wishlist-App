import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers?.authorization
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "User not Authorized!",
      });
    }
    const token = authHeader.split(' ')[1];
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(401).json({
        success: false,
        message: "Invalid user!",
      });
    }
    req.id = decode.userId;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid user!",
    });
  }
};
