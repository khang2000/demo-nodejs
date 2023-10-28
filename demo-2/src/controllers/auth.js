import User from "../models/User";
import { signInValidator, signUpValidator } from "../validation/user";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const { SECRET_CODE } = process.env;
export const signUp = async (req, res) => {
  try {
    // Bước 1: Validate dư liệu người dùng
    const { error } = signUpValidator.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    // Bước 2: Kiểm tra xem email đã tồn tại trong hệ thống hay chưa?
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(400).json({
        message: "Email nay da duoc dang ky, ban co muon dang nhap khong",
      });
    }
    // Bước 3: Mã hóa password
    const hashedPassword = await bcryptjs.hash(req.body.password, 10);
    // Bước 4: Khởi tạo User trong db
    const user = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    // Bước 5: Thông báo cho người dùng đăng ký thành công
    // Xóa mật khẩu đi
    user.password = undefined;
    return res.status(200).json({
      message: "Dang ky account thanh cong",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    // Bước 1: Validate data từ phía người dùng
    const { error } = signInValidator.validate(req.body, { abortEarly: false });
    if (error) {
      console.log(error);
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    // Bước 2: Kiểm tra email đã tồn tại hay chưa?
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        message: "Email nay chua dang ky, ban co muon dang ky khong?",
      });
    }
    // Bước 3: Kiểm tra password
    const isMatch = await bcryptjs.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(404).json({
        message: "Password incorrect",
      });
    }
    // Bước 4: Tạo JWT
    const accessToken = jwt.sign({ _id: user._id }, SECRET_CODE, {
      expiresIn: "1d",
    });
    console.log(accessToken);
    // Bước 5: Trả ra thông báo cho người dùng
    user.password = undefined;
    return res.status(200).json({
      message: "Dang nhap thanh cong",
      user,
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
