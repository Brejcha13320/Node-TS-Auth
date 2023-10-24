import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { CategoryService } from "../services/category.service";
import { RequestExt } from "../models/request-ext";

const service = new CategoryService();

const getCategory = async (req: RequestExt, res: Response) => {
  try {
    const { id } = req.params;
    const id_user = req.user?.id as string;
    const response = await service.findOne(id, id_user);
    if (!response) {
      handleHttp(
        res,
        404,
        "ERROR_FIND_CATEGORY",
        `No existe una categoria con el id ${id}`,
      );
    }
    res.send({ success: true, data: response });
  } catch (e) {
    handleHttp(res, 500, "ERROR_GET_CATEGORY", e);
  }
};

const getCategoriesSearch = async (req: RequestExt, res: Response) => {
  try {
    const { term } = req.params;
    const id_user = req.user?.id as string;
    const response = await service.findSearch(id_user, term);
    res.send({ success: true, data: response });
  } catch (e) {
    handleHttp(res, 500, "ERROR_GET_CATEGORIES_SEARCH", e);
  }
};

const getCategories = async (req: RequestExt, res: Response) => {
  try {
    const id_user = req.user?.id as string;
    const response = await service.find(id_user);
    res.send({ success: true, data: response });
  } catch (e) {
    handleHttp(res, 500, "ERROR_GET_CATEGORIES", e);
  }
};

const updateCategory = async (req: RequestExt, res: Response) => {
  try {
    const { id } = req.params;
    const id_user = req.user?.id as string;
    const body = req.body;
    const response = await service.update(id, id_user, body);
    res.send({ success: true, data: response });
  } catch (e) {
    handleHttp(res, 500, "ERROR_UPDATE_CATEGORY", e);
  }
};

const createCategory = async (req: RequestExt, res: Response) => {
  try {
    const objCategory = {
      ...req.body,
      id_user: req.user?.id,
    };
    const response = await service.create(objCategory);
    res.send({ success: true, data: response });
  } catch (e) {
    handleHttp(res, 500, "ERROR_CREATE_CATEGORY", e);
  }
};

const deleteCategory = async (req: RequestExt, res: Response) => {
  try {
    const { id } = req.params;
    const id_user = req.user?.id as string;
    const response = await service.delete(id, id_user);
    res.send({ success: true, data: response });
  } catch (e) {
    handleHttp(res, 500, "ERROR_DELETE_CATEGORY", e);
  }
};

export {
  getCategory,
  getCategories,
  updateCategory,
  createCategory,
  deleteCategory,
  getCategoriesSearch,
};
