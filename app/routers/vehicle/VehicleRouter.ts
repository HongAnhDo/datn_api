
// import * as typeVehicleController from "../../../controller/vehicle/TypeVehicleController"
import VehicleController from '../../controller/vehicle/VehicleController';
const express = require('express');
const router = express.Router();


let vehicleController = new VehicleController();
router.get('/', vehicleController.getAll);
router.get('/get-vehicle-name', vehicleController.getVehicleByName);
router.post('/', vehicleController.postCar);
router.post('/update-vehicle', vehicleController.postVehicle);
router.post('/edit-car', vehicleController.editCar);
router.post('/list-vehicle', vehicleController.postVehicle);
router.get("/get-detail-vehicle", vehicleController.getVehicleById)
router.get("/get-option-vehicle", vehicleController.getVehicleOption)


module.exports = router;