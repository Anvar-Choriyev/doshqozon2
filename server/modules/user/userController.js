const User = require("./User");
const AppError = require("../../core/utils/AppError");
const catchAsync = require("../../core/utils/catchAsync");
const { Op } = require("sequelize");
const { hash } = require("bcrypt");
const { validationResult } = require("express-validator");
const Attachments = require("../attachments/Attachments");
const fs = require("fs");
const Order = require("../order/Order");
const Food = require("../food/Food");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const allUsers = await User.findAll({
    attributes: { exclude: ["password"] },
  });
  allUsers.forEach(async user => {
    const attachment = await Attachments.findAll({
      where: {
        id: { [Op.eq]: user.attachmentId },
      },
    });
    attachment.forEach(async img => {
      if (img.id === user.attachmentId) {
        await img.update({ isConnect: true });
      }
    });
  });
  res.json({
    status: "success",
    message: "All users",
    error: null,
    data: allUsers,
  });
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const userById = await User.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  if (!userById) {
    return next(
      new AppError("Bunday foydalanuvchi mavjud emas")
    );
  }

  const totalMoneyAndCountUser =
    await Order.findAndCountAll({
      where: { stuffId: id },
      attributes: ["totalPrice"],
    });
  let total = 0;
  totalMoneyAndCountUser.rows?.map(
    e => (total += e.totalPrice)
  );

  res.json({
    status: "success",
    message: "User by ID",
    error: null,
    data: {
      userById,
      totalSum: total,
      count: totalMoneyAndCountUser.count,
    },
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const err = new AppError("Validatsiya xatosi", 400);
    err.isOperational = false;
    err.errors = validationErrors;
    return next(err);
  }
  await User.create(req.body);
  res.json({
    status: "success",
    message: "Foydalanuvchi yaratildi",
    error: null,
    data: null,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const err = new AppError("Validatsiya xatosi", 400);
    err.isOperational = false;
    err.errors = validationErrors;
    return next(err);
  }
  const { id } = req.params;
  const userById = await User.findByPk(id, {
    attributes: { exclude: ["password"] },
    include: { model: Attachments, as: "attachment" },
  });
  if (!userById) {
    return next(
      new AppError("Bunday foydalanuvchi topilmadi")
    );
  }
  if (
    userById.attachmentId &&
    req.body.attachmentId !== userById.attachmentId
  ) {
    const attachment = await Attachments.findByPk(
      userById.attachmentId
    );
    const directoryPath = `./build/img/${attachment.name}`;
    fs.unlink(directoryPath, err => {
      if (err) {
        throw err;
      }
      console.log("Delete file successfully.");
    });
    await attachment.destroy();
  }
  let updatedUser;
  updatedUser = await userById.update(req.body, {
    isConnect: true,
  });
  res.json({
    status: "success",
    message: "Foydalanuvchi ma'lumotlari yangilandi",
    error: null,
    data: updatedUser,
  });
});
exports.updatePassword = catchAsync(
  async (req, res, next) => {
    const { id } = req.user;
    const byIdUser = await User.findByPk(id);
    if (!byIdUser) {
      return next(
        new AppError(`Bunday foydalanuvchi topilmadi`)
      );
    }
    if (id === +req.params.id) {
      if (byIdUser.username === req.body.username) {
        const newPassword = await hash(
          req.body.password,
          8
        );
        await byIdUser.update({ password: newPassword });
      } else {
        return next(new AppError("Login xato kiritildi"));
      }
    } else {
      return next(
        new AppError(
          "Siz bu foydalanuvchi parolini o'zgartira olmaysiz",
          400
        )
      );
    }
    res.status(203).json({
      status: "success",
      message: "Foydalanuvchi paroli o'zgartirildi",
      error: null,
      data: null,
    });
  }
);
exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const userById = await User.findByPk(id);
  if (!userById) {
    return next(
      new AppError("Bunday foydalanuvchi mavjud emas")
    );
  }
  if(userById.id !== req.user.id) {
    await userById.destroy();
  }
  else {
    return next(
      new AppError("Admin o'zini o'chirishi mumkin emas")
    );
  }
  res.json({
    status: "success",
    message: "Foydalanuvchi o'chirildi",
    error: null,
    data: null,
  });
});
