import * as express from 'express';
import * as bodyParser from "body-parser";
import "reflect-metadata";
import { createConnections } from 'typeorm'
import * as expressValidator from "express-validator";
import * as dotenv from 'dotenv';
import { MyUtil } from './utils/MyUtil';


createConnections().catch((e) => console.log(e)).then((e) => {

    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    dotenv.config({ path: '.env' });
    app.set("port", process.env.PORT || 3000);

    console.log("ENV: ", app.get('env'))

    let engine = require('ejs-locals');
    app.engine('ejs', engine);
    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');

    app.use(expressValidator());

    const userRoute = require('./routers/user/UserAccountRouter')

    const typeRoute = require('./routers/vehicle/TypeVehicleRouter')
    const brandRoute = require('./routers/vehicle/BrandVehicleRouter')
    const modelRoute = require('./routers/vehicle/ModelVehicleRouter')
    const transmissionRoute = require('./routers/vehicle/TransmissionRouter')
    const designRoute = require('./routers/vehicle/DesignVehicleRouter')
    const fuelRoute = require('./routers/vehicle/FuelVehicleRouter')
    const seatRoute = require('./routers/vehicle/SeatVehicleRouter')
    const vehicleRoute = require('./routers/vehicle/VehicleRouter')
    const motoRoute = require('./routers/vehicle/MotoRouter')
    const option = require('./routers/vehicle/OptionVehicleRouter')
    const partnerRoute = require('./routers/partner/PartnerRouter')
    const vehiclePartnerRoute = require('./routers/partner/VehiclePartRouter')
    const bookingRoute = require('./routers/booking/BookingRouter')
    const cityRoute = require('./routers/partner/CityRouter')
    const cityCstmRoute = require('./routers/partner/CityCstmRouter')
    const importRoute = require('./routers/import/ImportRouter');


    //user
    // app.use("/users", userRoute);
    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });
    app.use("/export", importRoute);

    app.use("/users", userRoute);

    //vehicle
    app.use("/vehicles/type", typeRoute);
    app.use("/vehicles/brand", brandRoute);
    app.use("/vehicles/model", modelRoute);
    app.use("/vehicles/transmission", transmissionRoute);
    app.use("/vehicles/design", designRoute);
    app.use("/vehicles/fuel", fuelRoute);
    app.use("/vehicles/seat", seatRoute);
    app.use("/vehicles", vehicleRoute);
    app.use("/motorbike", motoRoute);
    app.use("/option", option);
    //booking
    app.use("/booking", bookingRoute);

    //partner
    app.use("/partners", partnerRoute);
    app.use("/vehicle-partner", vehiclePartnerRoute)
    app.use("/partners/cities", cityRoute);
    app.use("/partners/cstm-cities", cityCstmRoute);


    const multer = require('multer')
    const fs = require('fs')
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads/');
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    });
    const upload = multer({
        storage: storage,
        limits: { fileSize: 10000000, files: 1 },
        fileFilter: (req, file, callback) => {
            var filename = file.originalname.toLowerCase();

            if (!filename.match(/\.(jpg|jpeg|png|webp  )$/)) {

                return callback(new Error('Only Images are allowed !'), false)
            }

            callback(null, true);
        }
    }).single('myImg')


    app.post('/upload', (req, res) => {
        upload(req, res, function (err) {
            if (err) {
                res.status(400).json({ message: err.message })
            } else {
                let path = `/uploads/${req.file.filename}`
                path = "https://api.chungxe.vn" + path
                res.status(200).json({ message: 'Image Uploaded Successfully !', path: path })
            }
        })
    })

    var path = require('path');
    app.use("/uploads", express.static(path.join(__dirname, '../uploads')));
    app.use("/uploads/jpg", express.static(path.join(__dirname, '../uploads/jpg')));

    var admin = require("firebase-admin");

    var serviceAccount = require("../firebase-adminsdk.json");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://chungxe-app-client.firebaseio.com"
    });
   
    app.post('/push', function (req, res, next) {
        

        var registerToken = "c4G70JnHUu4:APA91bGzzStCtQf-3wURaPze1L6CFcM--E3Jca00kcCm474OfuFdtnro-X7cSHvGBIGeKAoVAtt-7uaRnBfqS4mLeuKZA7OPfTxkzRkvkRNzgSNO-1R-JUoZX8bBEocFtzW_hlUzl4df";
        var payload = {
            notification: {
                title: "This is a Notification",
                body: "This is the body of the notification message."
            }
        };

        var options = {
            priority: "high",
            timeToLive: 60 * 60 * 24
        };
        // admin.messaging().sendToDevice(registerToken, payload, options)
        //     .then(function (response) {
        //         MyUtil.handleSuccess(response, res)
        //         })
        //     .catch(function (error) {
        //         MyUtil.handleError({message:"error"}, res)
        //     });

        admin.messaging().sendToTopic('test', payload, options).then(function (response) {
            return res.json({ message: 'Push Success!' });
          }).catch(function (error) {
            console.log("Error sending message:", error);
            return res.json({ message: 'Push Fail!' });
          })
    });


    app.listen(app.get("port"), () => {
        console.log(("  App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
        console.log("  Press CTRL-C to stop\n");
    });
    // var io = require('socket.io');
    // var socket = io.listen(listen);
    // require('./routes/notify/NotifyRouter')(app,socket);

}).catch((err) => console.log(err))
