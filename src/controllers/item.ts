import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { ItemService } from "../services/item.service";

const service = new ItemService();

const getItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await service.findOne(id);
    if (!response) {
      handleHttp(
        res,
        404,
        "ERROR_FIND_ITEM",
        `No existe el item con el id ${id}`,
      );
    }
    res.send({ success: true, data: response });
  } catch (e) {
    handleHttp(res, 500, "ERROR_GET_ITEM", e);
  }
};

const getItems = async (req: Request, res: Response) => {
  try {
    const response = await service.find();
    res.send({ success: true, data: response });
  } catch (e) {
    handleHttp(res, 500, "ERROR_GET_ITEMS", e);
  }
};

const updateItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const response = await service.update(id, body);
    res.send({ success: true, data: response });
  } catch (e) {
    handleHttp(res, 500, "ERROR_UPDATE_ITEM", e);
  }
};

const createItem = async (req: Request, res: Response) => {
  try {
    const response = await service.create(req.body);
    res.send({ success: true, data: response });
  } catch (e) {
    handleHttp(res, 500, "ERROR_CREATE_ITEM", e);
  }
};

const deleteItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await service.delete(id);
    res.send({ success: true, data: response });
  } catch (e) {
    handleHttp(res, 500, "ERROR_DELETE_ITEM", e);
  }
};

export { getItem, getItems, updateItem, createItem, deleteItem };
