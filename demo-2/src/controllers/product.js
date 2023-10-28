import Category from "../models/Category.js";
import Product from "../models/Product.js";
import { productValid } from "../validation/product.js";

export const getList = async (req, res) => {
  try {
    // const data = await Product.find({}).populate("categoryId");
    const {
      _page = 1,
      _limit = 10,
      _sort = "createdAt",
      _order = "asc",
    } = req.query;
    const option = {
      page: _page,
      limit: _limit,
      sort: {
        [_sort]: _order === "asc" ? 1 : -1,
      },
    };
    const data = await Product.paginate({}, option);
    console.log(data);
    if (!data.docs || data.docs.length === 0) {
      return res.status(404).json({
        message: "Khong tim thay san pham",
      });
    }
    return res.status(200).json({
      message: "lay danh sach san pham thanh cong",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({ message: "Loi sever" });
  }
};

export const getDetail = async (req, res) => {
  try {
    const data = await Product.findById(req.params.id).populate("categoryId");
    if (!data) {
      return res.status(404).json({
        message: "Khong tim thay san pham",
      });
    }
    return res.status(200).json({
      message: "lay san pham thanh cong",
      data: data,
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
    const data = await Product.create(req.body);
    if (!data) {
      return res.status(404).json({
        message: "khong tao duoc san pham",
      });
    }
    const updateCategory = await Category.findByIdAndUpdate(data.categoryId, {
      $addToSet: {
        products: data._id,
      },
    });
    if (!updateCategory) {
      return res.status(404).json({
        message: "Update Category not successful",
      });
    }
    return res.status(200).json({
      message: "tao san pham thanh cong",
      product: data,
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

export const remove = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(400).json({
        message: "xoa san pham khong thanh cong",
      });
    }
    return res.status(200).json({
      message: "xoa san pham thanh cong",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
