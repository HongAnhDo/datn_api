import CityCstmController from "../../controller/partner/CityCstmController";
const express = require('express');
const router = express.Router();

let cityCstmController = new CityCstmController();

router.get("/", cityCstmController.getAll);

module.exports = router;