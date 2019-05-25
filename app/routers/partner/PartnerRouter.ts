import PartnerController from "../../controller/partner/PartnerController";
import CityController from "../../controller/partner/CityController";
import ProcedureController from "../../controller/partner/ProcedureController";
import WdayController from "../../controller/partner/WdayController";
import HolidayController from "../../controller/partner/HolidayController";
import PartProcController from "../../controller/partner/PartProcController";
import PaymenthodController from "../../controller/partner/PayController";
const express = require('express');
const router = express.Router();

let partnerController = new PartnerController();
let procController = new ProcedureController();
let wdayController = new WdayController();
let holiController = new HolidayController();
let cityController = new CityController();
let payController = new PaymenthodController()
let partProduceController = new PartProcController();

router.get('/get-by-options', partnerController.getPartnerOptions);
router.get('/', partnerController.getAll);
router.get('/get-detail-partner', partnerController.getDetail);
router.get('/produces', procController.getAll);
router.get('/wdays', wdayController.getAll)
router.get('/holidays', holiController.getAll);
router.get('/paymenthods', payController.getAll);
router.post('/',partnerController.postPartner);
router.post('/edit',partnerController.editPartner);
router.delete('/part-proc', partProduceController.deleteByPartId)
router.put('/delete', partnerController.delete)


module.exports = router;