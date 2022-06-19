const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/AppError");
const API = require("../utils/apiFeatures");

// create new document
exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

// delete an existent document
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(
        new appError(`can''t find a document with this ID ${id}`, 404)
      );
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  });

// update a document
exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(
        new appError(`can''t find a document with this ID ${id}`, 404)
      );
    }
    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

// get all the documents
exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter;
    if (req.params.userId) {
      filter = {
        user: req.params.userId,
      };
    }

    if (req.params.roomId) {
      filter = {
        chatroom: req.params.roomId,
      };
    }
    const query = new API(Model.find(filter), req.query)
      .filter()
      .limitFields()
      .paginate()
      .sort().query;

    const docs = await query;
    res.status(200).json({
      status: "success",
      data: {
        data: docs,
      },
    });
  });

// get a document by id
exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter;
    if (req.params.userId) {
      filter = {
        user: req.params.userId,
      };
    }
    filter._id = req.params.id;
    const doc = await Model.findOne();
    if (!doc) {
      return next(
        new appError(`can''t find a document with this ID ${id}`, 404)
      );
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

// delete all
exports.deleteAll = (Model) =>
  catchAsync(async (req, res, next) => {
    await Model.deleteMany({});
    res.status(204).json({
      status: "success",
      data: null,
    });
  });
