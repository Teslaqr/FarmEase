const Equipment = require('../models/Equipment');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const cloudinary = require('cloudinary').v2;

// @desc    Get all equipment
// @route   GET /api/v1/equipment
// @access  Public
exports.getEquipment = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single equipment
// @route   GET /api/v1/equipment/:id
// @access  Public
exports.getSingleEquipment = asyncHandler(async (req, res, next) => {
  const equipment = await Equipment.findById(req.params.id).populate({
    path: 'owner',
    select: 'name email phone location',
  });

  if (!equipment) {
    return next(
      new ErrorResponse(`Equipment not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: equipment,
  });
});

// @desc    Create new equipment
// @route   POST /api/v1/equipment
// @access  Private (Owner)
exports.createEquipment = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.owner = req.user.id;

  // Check if user is equipment owner
  if (req.user.role !== 'owner') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to add equipment`,
        401
      )
    );
  }

  const equipment = await Equipment.create(req.body);

  res.status(201).json({
    success: true,
    data: equipment,
  });
});

// @desc    Update equipment
// @route   PUT /api/v1/equipment/:id
// @access  Private (Owner)
exports.updateEquipment = asyncHandler(async (req, res, next) => {
  let equipment = await Equipment.findById(req.params.id);

  if (!equipment) {
    return next(
      new ErrorResponse(`Equipment not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is equipment owner
  if (equipment.owner.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this equipment`,
        401
      )
    );
  }

  equipment = await Equipment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: equipment,
  });
});

// @desc    Delete equipment
// @route   DELETE /api/v1/equipment/:id
// @access  Private (Owner/Admin)
exports.deleteEquipment = asyncHandler(async (req, res, next) => {
  const equipment = await Equipment.findById(req.params.id);

  if (!equipment) {
    return next(
      new ErrorResponse(`Equipment not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is equipment owner or admin
  if (equipment.owner.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this equipment`,
        401
      )
    );
  }

  await equipment.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc    Upload photo for equipment
// @route   PUT /api/v1/equipment/:id/photo
// @access  Private (Owner)
exports.uploadEquipmentPhoto = asyncHandler(async (req, res, next) => {
  const equipment = await Equipment.findById(req.params.id);

  if (!equipment) {
    return next(
      new ErrorResponse(`Equipment not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is equipment owner
  if (equipment.owner.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this equipment`,
        401
      )
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  // Upload image to cloudinary
  const result = await cloudinary.uploader.upload(file.tempFilePath, {
    folder: 'agrihelp/equipment',
    width: 1500,
    crop: 'scale',
  });

  // Add image to equipment
  equipment.images.push({
    public_id: result.public_id,
    url: result.secure_url,
  });

  await equipment.save();

  res.status(200).json({
    success: true,
    data: equipment,
  });
});