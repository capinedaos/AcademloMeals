// Models
const { Order } = require('../models/order.model');

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

module.exports = { createOrder };
