import Category from "../models/Category";
import { categoryValidator } from "../validation/category";

export const getALL = async (req, res) => {
  try {
    const data = await Category.find({}).populate("products");
    if (!data || data.length === 0) {
      return res.status(404).json({
        message: "No Category",
      });
    }
    return res.status(200).json({
      message: "Category has been",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

export const getDetail = async (req, res) => {
  try {
    const data = await Category.findById(req.params.id).populate("products");
    if (!data) {
      return res.status(404).json({
        message: "No Category",
      });
    }
    return res.status(200).json({
      message: "Category has been",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

export const create = async (req, res) => {
  try {
    const { error } = categoryValidator.validate(req.body);
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const data = await Category.create(req.body);
    if (!data) {
      return res.status(400).json({
        message: " Create Category not successful",
      });
    }
    return res.status(200).json({
      message: "Create Category successful",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error,
    });
  }
};

export const update = async (req, res) => {
  try {
    const { error } = categoryValidator.validate(req.body);
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(404).json({
        message: errors,
      });
    }
    const data = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!data) {
      return res.status(400).json({
        message: "Update Category not successful",
      });
    }
    return res.status(200).json({
      message: "Update Category successful",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const data = await Category.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(400).json({
        message: "Delete Category not successful",
      });
    }
    return res.status(200).json({
      message: "Delete Category successful",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};
