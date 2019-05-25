
// import * as typeVehicleController from "../../../controller/vehicle/TypeVehicleController"
import MotoController from '../../controller/vehicle/MotoController';
const express = require('express');
const router = express.Router();


let motoController = new MotoController();
router.get('/', motoController.getAll);
router.get('/get-vehicle-name', motoController.getVehicleByName);
router.post('/', motoController.postMotorbike);
router.post('/edit-motorbike', motoController.editMoto);
router.post('/update-vehicle', motoController.postVehicle);
router.post('/list-vehicle', motoController.postVehicle);
router.get("/get-detail-vehicle", motoController.getVehicleById)

module.exports = router;