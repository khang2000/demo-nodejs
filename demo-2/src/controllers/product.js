import Product from "../models/product.js";
import { productValid } from "../validation/product.js";

export const getALL = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      return res.status(404).json({
        message: "Khong tim thay san pham",
      });
    }
    return res.status(200).json({
      message: "lay danh sach san pham thanh cong",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({ message: "Loi sever" });
  }
};

export const getDetail = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        message: "Khong tim thay san pham",
      });
    }
    return res.status(200).json({
      message: "lay san pham thanh cong",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({ message: "Loi sever" });
  }
};

export const create = async (req, res) => {
  try {
    const { error } = productValid.validate(req.body);
    if (error) {
      res.status(400).json({
        message: error.details[0].message,
      });
    }
    const product = await Product.create(req.body);
    if (!product) {
      return res.status(404).json({
        message: "khong tao duoc san pham",
      });
    }
    return res.status(200).json({
      message: "tao san pham thanh cong",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const update = async (req, res) => {
  try {
    const { error } = productValid.validate(req.body, { abortEarly: false });
    if (error) {
      res.status(400).json({
        message: error.details[0].message,
      });
    }
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({
        message: "Cap nhat san pham khong thanh cong",
      });
    }
    return res.status(200).json({
      message: "Cap nhat san pham thanh cong",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const remove = (req, res) => {
  res.send("xoa san pham thanh cong");
};
