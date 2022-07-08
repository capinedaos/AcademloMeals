// Models
const { Order } = require('../models/order.model');
const { User } = require('../models/user.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');

const createOrder = catchAsync(async (req, res, next) => {
  const { mealId, quantity } = req.body;

  const newOrder = await Order.create({
    mealId,
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
  });

  res.status(201).json({
    status: 'success',
    order,
  });
});

const completedOrder = catchAsync(async (req, res, next) => {
  const { order } = req;
  await order.update({ status: 'completed' });
  res.status(201).json({ status: 'success', order });
});

const cancelledOrder = catchAsync(async (req, res, next) => {
  const { order } = req;
  await order.update({ status: 'cancelled' });
  res.status(201).json({ status: 'success', order });
});

module.exports = { createOrder, getAllOrders, completedOrder, cancelledOrder };
