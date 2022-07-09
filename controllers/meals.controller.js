// Models
const { Meal } = require('../models/meal.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');

const createMeal = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  const { name, price } = req.body;

  const newMeal = await Meal.create({
    name,
    price,
    restaurantId: restaurant.id,
  });

  res.status(201).json({
    status: 'success',
    newMeal,
  });
});

const getAllMeals = catchAsync(async (req, res, next) => {
  const meals = await Meal.findAll({
    where: {
      status: 'active',
    },
  });
  res.status(201).json({
    status: 'success',
    meals,
  });
});

const getAllMealById = catchAsync(async (req, res, next) => {
  const { meal } = req;

  res.status(201).json({
    status: 'success',
    meal,
  });
});

const updateMeal = catchAsync(async (req, res, next) => {
  const { meal, sessionUser } = req;
  const { name, price } = req.body;
  const role = sessionUser.role;

  if (role === 'admin') {
    await meal.update({ name, price });
  } else {
    return next(new AppError('admin permission required', 400));
  }

  res.status(201).json({ status: 'success', meal });
});

const deteleMeal = catchAsync(async (req, res, next) => {
  const { meal, sessionUser } = req;
  const role = sessionUser.role;

  if (role === 'admin') {
    await meal.update({ status: 'deleted' });
  } else {
    return next(new AppError('admin permission required', 400));
  }

  res.status(201).json({ status: 'success', meal });
});

module.exports = {
  createMeal,
  getAllMeals,
  getAllMealById,
  updateMeal,
  deteleMeal,
};
