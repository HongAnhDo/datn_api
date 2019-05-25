import VehiclePartController from "../../controller/partner/VehiclePartController";
const express = require('express');
const router = express.Router();

let vehiclePartnerController = new VehiclePartController();

router.get('/', vehiclePartnerController.getListVehicles);
// router.get('/', vehiclePartnerController);
router.get('/get-list-short', vehiclePartnerController.getListVehicles);
router.get('/get-list-for-app', vehiclePartnerController.getListVehicles)
router.get('/get-featured-vehicles', vehiclePartnerController.getListFeatured);
router.post('/', vehiclePartnerController.postVehicle)
router.put('/delete-vehicle-partner', vehiclePartnerController.deleteVehicle)
router.put('/edit-vehicle-partner', vehiclePartnerController.editVehicle)
router.get('/get-detail-vehicle-partner', vehiclePartnerController.getDetailVehicleParter);
router.get('/get-vehicle-by-options', vehiclePartnerController.getVehicleOption);
router.get('/get-vehicle-short-partner', vehiclePartnerController.getListOptionShort);
router.put('/update', vehiclePartnerController.updateSimple);
router.get('/get-vehicle-by-option', vehiclePartnerController.getVehicleOption);
router.get('/get-sum-vehicle-type', vehiclePartnerController.sumVehicle)
module.exports = router;