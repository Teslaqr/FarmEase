const express = require('express');
const {
  getEquipment,
  getSingleEquipment,
  createEquipment,
  updateEquipment,
  deleteEquipment,
  uploadEquipmentPhoto,
} = require('../controllers/equipmentController');
const { protect, authorize } = require('../middlewares/auth');
const advancedResults = require('../middlewares/advancedResults');
const Equipment = require('../models/Equipment');

const router = express.Router();

router
  .route('/')
  .get(advancedResults(Equipment, 'owner'), getEquipment)
  .post(protect, authorize('owner'), createEquipment);

router
  .route('/:id')
  .get(getSingleEquipment)
  .put(protect, authorize('owner', 'admin'), updateEquipment)
  .delete(protect, authorize('owner', 'admin'), deleteEquipment);

router
  .route('/:id/photo')
  .put(protect, authorize('owner'), uploadEquipmentPhoto);

module.exports = router;