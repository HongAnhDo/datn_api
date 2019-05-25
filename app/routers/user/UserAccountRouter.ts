
import UserAccountController from "../../controller/user/UserAccountController";
const express = require('express');
const router = express.Router();

const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/users/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    }
});
const upload = multer({
    storage: storage,
    limits: { files: 2 },
    // fileFilter: (req, file, callback) => {
    //     var filename = file.originalname.toLowerCase();

    //     if (!filename.match(/\.(jpg|jpeg|png|webp|docx|pdf  )$/)) {

    //         return callback(new Error('Only Images are allowed !'), false)
    //     }

    //     callback(null, true);
    // }
})

const userAccountController = new UserAccountController()

router.get('/', userAccountController.getAll);
router.get('/verifyAuth', userAccountController.getUserByToken);
router.get('/:user_acc_id', userAccountController.getOne);
router.post('/signup', userAccountController.postSignup);
router.put('/login', userAccountController.putLogin);
router.put('/login-admin', userAccountController.putLoginAdmin);
router.put('/logout', userAccountController.putLogout);
router.put('/edit', userAccountController.putUpdateUser);
router.put('/change-password', userAccountController.putChangePassword)
router.post('/upload-avatar', upload.single("avatar"), userAccountController.postUploadAvatar);
router.post('/upload-license', upload.single("license"), userAccountController.postUploadProcedure);
router.post('/upload-cmnd', upload.single("cmnd"), userAccountController.postUploadProcedure);
router.post('/upload-so-ho-khau', upload.single("so_ho_khau"), userAccountController.postUploadProcedure);
module.exports = router;