// Models
const { Order } = require('../models/order.model');
const { User } = require('../models/user.model');
const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');

const createOrder = catchAsync(async (req, res, next) => {
  const { sessionUser, meal } = req;
  const { mealId, quantity } = req.body;

  const newOrder = await Order.create({
    mealId,
    userId: sessionUser.id,
    totalPrice: meal.price * quantity,
    quantity,
  });

  res.status(201).json({
    status: 'success',
    newOrder,
  });
});

const getAllOrders = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const id = sessionUser.id;

  const order = await Order.findAll({
    where: { status: 'active', userId: id },
    include: [{ model: User }],
    include: { model: Meal, include: { model: Restaurant } },
  });

  res.status(201).json({
    status: 'success',
    order,
  });
});

const completedOrder = catchAsync(async (req, res, next) => {
  const { order, sessionUser } = req;

  if (sessionUser.id === review.userId) {
    await order.update({ status: 'completed' });
  } else {
    return next(new AppError('not the author of the order', 400));
  }

  res.status(201).json({ status: 'success', order });
});

const cancelledOrder = catchAsync(async (req, res, next) => {
  const { order, sessionUser } = req;

  if (sessionUser.id === review.userId) {
    await order.update({ status: 'cancelled' });
  } else {
    return next(new AppError('not the author of the order', 400));
  }

  res.status(201).json({ status: 'success', order });
});

module.exports = { createOrder, getAllOrders, completedOrder, cancelledOrder };
