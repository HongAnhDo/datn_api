
// import * as typeVehicleController from "../../../controller/vehicle/TypeVehicleController"
import ModelVehicleController from '../../controller/vehicle/ModelController';
const express = require('express');
const router = express.Router();


let modelController = new ModelVehicleController();
// router.get('/', modelController.getAll);
router.post('/', modelController.postModelVehicle);
router.get('/', modelController.getByTypeVehicle)
router.get('/get-model-vehicle', modelController.getModelVehicleById);
router.get('/get-model-vehicle-name', modelController.getModelVehicleByName);
router.post('/edit-type-vehicle', modelController.editModelVehicle)
router.get('/get-model-vehicle-by-brand', modelController.getByBrandId);
// router.get('/:vhc_type_id', modelController.getByTypeVehicle)

module.exports = router;