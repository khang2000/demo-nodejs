import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User";
dotenv.config();
const { SECRET_CODE } = process.env;
export const checkPermission = async (req, res, next) => {
  try {
    // Bước 1: Kiểm tra người dùng đăng nhập hay chưa?
    const token = req.headers.authorization?.split(" ")[1];
    // Bước 2: Kiểm tra token
    if (!token) {
      return res.status(403).json({
        message: "Ban chua dang nhap",
      });
    }
    // Bước 3: Kiểm tra quyền của người dùng?
    const decoded = jwt.verify(token, SECRET_CODE);
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(403).json({
        message: "Token error",
      });
    }
    if (user.role !== "admin") {
      return res.status(400).json({
        message: "Ban khong co quyen lam viec nay",
      });
    }
    // Bước 4: Next
    next();
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message,
    });
  }
};
