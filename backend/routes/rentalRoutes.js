const express = require('express');
const {
  getRentals,
  getRental,
  createRental,
  updateRental,
  deleteRental,
} = require('../controllers/rentalController');
const { protect, authorize } = require('../middlewares/auth');
const advancedResults = require('../middlewares/advancedResults');
const Rental = require('../models/Rental');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    protect,
    advancedResults(Rental, {
      path: 'equipment',
      select: 'name price',
    }),
    getRentals
  )
  .post(protect, authorize('farmer'), createRental);

router
  .route('/:id')
  .get(protect, getRental)
  .put(protect, authorize('owner', 'admin'), updateRental)
  .delete(protect, authorize('admin'), deleteRental);

module.exports = router;