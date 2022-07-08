// Models
const { Restaurant } = require('../models/restaurant.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const newRestaurant = await Restaurant.create({
    name,
    address,
    rating,
  });

  res.status(201).json({
    status: 'success',
    newRestaurant,
  });
});

const getAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.findAll({
    where: { status: 'active' },
  });

  res.status(201).json({
    status: 'success',
    restaurants,
  });
});

const getRestaurantById = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  res.status(201).json({
    status: 'success',
    restaurant,
  });
});

const updateRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant, sessionUser } = req;
  const { name, address } = req.body;

  const status = sessionUser.status;

  if (status === 'admin') {
    await restaurant.update({ name, address });
  } else {
    return next(new AppError('admin permission required', 400));
  }

  res.status(201).json({ status: 'success', restaurant });
});

const deteleRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant, sessionUser } = req;

  const status = sessionUser.status;

  if (status === 'admin') {
    await restaurant.update({ status: 'disabled' });
  } else {
    return next(new AppError('admin permission required', 400));
  }

  res.status(201).json({ status: 'success', restaurant });
});

const createReview = catchAsync(async (req, res, next) => {});

const updateReview = catchAsync(async (req, res, next) => {});

const deleteReview = catchAsync(async (req, res, next) => {});


module.exports = {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deteleRestaurant,
  createReview,
  updateReview,
  deleteReview,
};
