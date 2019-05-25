import BookingController from "../../controller/booking/BookingController";
import BookStatusController from "../../controller/booking/BookSttController";
import BookSourceController from "../../controller/booking/BookSourceController";
import BookReasonController from "../../controller/booking/BookReasonController";
const express = require('express');
const router = express.Router();

let bookingController = new BookingController();
let bookStatus = new BookStatusController()
let bookSource = new BookSourceController()
let bookReason = new BookReasonController();

router.get("/", bookingController.getAll);
router.get("/list", bookingController.getList);
router.get("/get-by-user", bookingController.getBookingsUser);

router.get("/all-status", bookStatus.getAll);
router.get("/all-reasons", bookReason.getAll);
router.get("/all-sources", bookSource.getAll);
router.put('/delete', bookingController.delete)
router.get("/get-detail-booking/:code", bookingController.getByCode);
router.get("/get-detail-booking-full/:code", bookingController.getByCodeFullResponse);
router.post("/", bookingController.postCreate);
router.get("/deli-price", bookingController.getCalculateDeliPrice);
router.get("/detail-price", bookingController.getDetailPrice);
router.get("/promotion", bookingController.getPromotionPrice);
router.get("/get-by-user", bookingController.getBookingsByUserId);
router.get("/get-by-token", bookingController.getBookingsByToken);
router.post("/send-email", bookingController.postSendEmail);
router.post("/send-requirement", bookingController.postSendRequirement);
router.put("/update-level", bookingController.updateLevel)
router.put("/quick-edit", bookingController.editQuickBook)
router.put("/edit", bookingController.editBooking)
router.get("/get_conversion", bookingController.getBookingByAffId);
router.get("/statistic-reason", bookingController.statisticReason)
router.get("/statistic-level", bookingController.statisticLevel)
router.get("/statistic-level-week", bookingController.statisticLevelWeek)


module.exports = router;