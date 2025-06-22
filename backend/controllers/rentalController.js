const Rental = require('../models/Rental');
const Equipment = require('../models/Equipment');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');

// @desc    Get all rentals
// @route   GET /api/v1/rentals
// @route   GET /api/v1/equipment/:equipmentId/rentals
// @access  Private
exports.getRentals = asyncHandler(async (req, res, next) => {
  if (req.params.equipmentId) {
    const rentals = await Rental.find({ equipment: req.params.equipmentId });

    return res.status(200).json({
      success: true,
      count: rentals.length,
      data: rentals,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc    Get single rental
// @route   GET /api/v1/rentals/:id
// @access  Private
exports.getRental = asyncHandler(async (req, res, next) => {
  const rental = await Rental.findById(req.params.id).populate({
    path: 'equipment',
    select: 'name price',
  });

  if (!rental) {
    return next(
      new ErrorResponse(`No rental found with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is rental owner or admin
  if (
    rental.user.toString() !== req.user.id &&
    req.user.role !== 'admin' &&
    rental.equipment.owner.toString() !== req.user.id
  ) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to access this rental`,
        401
      )
    );
  }

  res.status(200).json({
    success: true,
    data: rental,
  });
});

// @desc    Create new rental
// @route   POST /api/v1/equipment/:equipmentId/rentals
// @access  Private (Farmer)
exports.createRental = asyncHandler(async (req, res, next) => {
  req.body.equipment = req.params.equipmentId;
  req.body.user = req.user.id;

  // Check if user is a farmer
  if (req.user.role !== 'farmer') {
    return next(
      new ErrorResponse(`User ${req.user.id} is not authorized to rent equipment`, 401)
    );
  }

  const equipment = await Equipment.findById(req.params.equipmentId);

  if (!equipment) {
    return next(
      new ErrorResponse(
        `No equipment with the id of ${req.params.equipmentId}`,
        404
      )
    );
  }

  // Check if equipment is available
  if (equipment.availability !== 'Available') {
    return next(
      new ErrorResponse(
        `Equipment ${equipment.name} is not available for rent`,
        400
      )
    );
  }

  // Calculate rental days
  const startDate = new Date(req.body.startDate);
  const endDate = new Date(req.body.endDate);
  const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

  // Calculate total price
  const totalPrice = days * equipment.price;

  // Create rental
  const rental = await Rental.create({
    ...req.body,
    totalPrice,
  });

  // Update equipment availability
  equipment.availability = 'Rented';
  await equipment.save();

  res.status(201).json({
    success: true,
    data: rental,
  });
});

// @desc    Update rental status
// @route   PUT /api/v1/rentals/:id
// @access  Private (Owner/Admin)
exports.updateRental = asyncHandler(async (req, res, next) => {
  let rental = await Rental.findById(req.params.id).populate({
    path: 'equipment',
    select: 'owner',
  });

  if (!rental) {
    return next(
      new ErrorResponse(`No rental with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is equipment owner or admin
  if (
    rental.equipment.owner.toString() !== req.user.id &&
    req.user.role !== 'admin'
  ) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this rental`,
        401
      )
    );
  }

  // Update rental status
  rental = await Rental.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  // If rental is completed, update equipment availability
  if (req.body.status === 'Completed') {
    await Equipment.findByIdAndUpdate(rental.equipment, {
      availability: 'Available',
    });
  }

  res.status(200).json({
    success: true,
    data: rental,
  });
});

// @desc    Delete rental
// @route   DELETE /api/v1/rentals/:id
// @access  Private (Admin)
exports.deleteRental = asyncHandler(async (req, res, next) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental) {
    return next(
      new ErrorResponse(`No rental with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is admin
  if (req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete rentals`,
        401
      )
    );
  }

  await rental.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});