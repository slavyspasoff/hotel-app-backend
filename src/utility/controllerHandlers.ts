import { Response, type Request } from 'express';
import { type Model } from 'mongoose';

import catchAsync from './catchAsync';

const getAllHandler = <T, U, K>(model: Model<T, U, K>) =>
  catchAsync(async (req, res, next) => {
    const data = await model.find({});

    res.status(200).json({
      status: 'success',
      results: data.length,
      data: { data },
    });
  });

const getOneHandler = <T, U, K>(model: Model<T, U, K>) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const data = await model.findById(id);
    res.status(200).json({
      status: 'success',
      data: { data },
    });
  });

const createHandler = <T, U, K>(model: Model<T, U, K>) =>
  catchAsync(async (req, res, next) => {
    const data = await model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: { data },
    });
  });

const updateHandler = <T, U, K>(model: Model<T, U, K>) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const data = await model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: { data },
    });
  });

const deleteHandler = <T, U, K>(model: Model<T, U, K>) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    await model.findByIdAndDelete(id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

export {
  getAllHandler,
  getOneHandler,
  createHandler,
  updateHandler,
  deleteHandler,
};
