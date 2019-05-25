import "reflect-metadata";
import {ConnectionOptions} from "typeorm";
import * as dotenv from 'dotenv';
dotenv.config({path : '.env'});

var host = JSON.stringify(process.env.DB_HOST)
var port = parseInt(process.env.DB_TYPE)

 export let dbOptionsVehicle: ConnectionOptions = {
    type: "mysql",
    host: "1.chungxe.vn",
    port: 3306,
    username: "chungxe",
    password: "Di.Chung.@321!@#",
    database: "chungxe_vehicle",
    synchronize: true,
    logging: false,
    entities: [
       "app/entities/vehicle/*.ts"
    ],
    migrations: [
       "app/migration/**/*.ts"
    ],
    subscribers: [
       "app/subscriber/**/*.ts"
    ],
    cli: {
       "entitiesDir": "app/entities",
       "migrationsDir": "app/migration",
       "subscribersDir": "app/subscriber"
    }
}

export let dbOptionsUser: ConnectionOptions = {
    type: "mysql",
    host: "1.chungxe.vn",
    port: 3306,
    username: "chungxe",
    password: "Di.Chung.@321!@#",
    database: "chungxe_user",
    synchronize: true,
    logging: false,
    entities: [
       "app/entities/user/*.ts"
    ],
    migrations: [
       "app/migration/**/*.ts"
    ],
    subscribers: [
       "app/subscriber/**/*.ts"
    ],
    cli: {
       "entitiesDir": "app/entities",
       "migrationsDir": "app/migration",
       "subscribersDir": "app/subscriber"
    }
}