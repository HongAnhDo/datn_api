import { cx_vhc_part as VehiclePartner } from "../../../entities/partner/cx_vhc_part";
import VehiclePartRepository from "../../../repository/partner/VehiclePartRepository";
import IVehiclePartService from "../IVehiclePartService"
import { UpdateResult } from "typeorm";
import VehicleService from '../../../service/vehicle/VehicleService'
import PartnerService from "./PartnerService";
import ImageService from "../../vehicle/ImageService";

export default class VehiclePartService implements IVehiclePartService {

    private vehiclePartRepo: VehiclePartRepository;
    private vehicleService: VehicleService;
    private partnerService: PartnerService;
    private imageService: ImageService;

    constructor() {
        this.vehiclePartRepo = new VehiclePartRepository();
        this.vehicleService = new VehicleService();
        this.partnerService = new PartnerService();
        this.imageService = new ImageService();
    }

    public async getList(index, options): Promise<Array<VehiclePartner>> {
        var result = new Array<VehiclePartner>();
        result = await this.vehiclePartRepo.getList(index, options).catch(err => {
            throw new Error(err)
        })
        return result;
    }

    public async getListLimit(numberLimit: number): Promise<Array<VehiclePartner>> {
        var result = new Array<VehiclePartner>();
        result = await this.vehiclePartRepo.getListLimit(numberLimit).catch(err => {
            throw new Error(err)
        })
        return result;
    }

    public async getAll(): Promise<Array<VehiclePartner>> {
        return await this.vehiclePartRepo.getAll();
    }

    public async getFeaturedProducts(): Promise<Array<VehiclePartner>> {
        return await this.vehiclePartRepo.getFeaturedProducts();
    }

    public async getOne(id: number): Promise<VehiclePartner> {
        return await this.vehiclePartRepo.getOne(id);
    }

    public async create(vehicle: VehiclePartner): Promise<VehiclePartner> {
        return await this.vehiclePartRepo.create(vehicle);
    }

    public async delete(id: number): Promise<UpdateResult> {
        return await this.vehiclePartRepo.delete(id);
    }
    public async update(id: number, vehicle: VehiclePartner): Promise<VehiclePartner> {
        return await this.vehiclePartRepo.update(id, vehicle);

    }

    public async findByVehicleName(name: string): Promise<VehiclePartner> {
        return await this.vehiclePartRepo.findByVehicleName(name)
    }

    public async findByVehicleOption(option: any): Promise<any> {
        return await this.vehiclePartRepo.findByVehicleOption(option);
    }

    public async createList(list: Array<VehiclePartner>): Promise<Array<VehiclePartner>> {
        return await this.vehiclePartRepo.createList(list);
    }
    public async  findVehicles(vehicleIds: number[], partnerIds: number[], price_from: number, price_to: number, vhc_part_hide: number): Promise<any> {
        return await this.vehiclePartRepo.findVehicles(vehicleIds, partnerIds, price_from, price_to, vhc_part_hide);
    }

    public async  findVehiclesLimit(index: number, vehicleIds: number[], partnerIds: number[], price_from: number, price_to: number, vhc_part_hide: number): Promise<any> {
        return await this.vehiclePartRepo.findVehiclesLimit(index, vehicleIds, partnerIds, price_from, price_to, vhc_part_hide);
    }

    public async sumVehicle(vhc_type_id: number): Promise<number> {
        return await this.vehiclePartRepo.sumVehicle(vhc_type_id).catch((err) => { throw new Error(err) });
    }

    public getDetailVehicleForApp = async (vhc_part_id: number) => {
        let vhc_id, part_id, vehicle, partner, vhc_imgs;
        let vehiclePartner = {}

        if (vhc_part_id) {
            let result = await this.getOne(vhc_part_id).catch((err) => { throw new Error(err) })
            if (result) {
                vhc_id = result.vhc_id;
                part_id = result.part_id;
                partner = await this.partnerService.getPartnerById(part_id).catch((err) => { throw new Error(err) })
                var part = {
                    "part_id": partner.part_id,
                    "part_name": partner.part_name,
                    "city_id": partner.city_id,
                    "city_name": partner.city_name,
                    "part_lat": partner.part_lat,
                    "part_lng": partner.part_lng,
                    "part_addr": partner.part_addr,
                    "part_addr_shor": partner.part_addr_shor,
                    "part_stat_time": partner.part_stat_time,
                    "part_end_time": partner.part_end_time,
                    "vhc_type_id": partner.vhc_type_id
                }

                vehicle = await this.vehicleService.getOne(vhc_id).catch((err) => { throw new Error(err) })
                vhc_imgs = await this.imageService.findByImageTable("cx_vhc", vehicle.vhc_id).catch(err => { throw new Error(err) })
                vehicle = Object.assign(vehicle, { "vhc_imgs": vhc_imgs })

                if (vehicle) {
                    if (vehicle.vhc_type_id == 1) {
                        vehiclePartner["vhc_part_name_short"] = vehicle.vhc_bran_name + " " + vehicle.vhc_modl_name + " " + result["vhc_part_year"]
                    }
                    vehiclePartner["vhc"] = vehicle;
                    vehiclePartner["part"] = part;
                    vehiclePartner["vhc_part_star"] = 4;
                    vehiclePartner = Object.assign(vehiclePartner, result)
                }
            }
        }
        return vehiclePartner;
    }

    public getDetailVehicleShort = async (vhc_part_id: number) => {
        let vhc_id, part_id, vehicle, partner;
        let vehiclePartner = {}

        if (vhc_part_id) {
            let result = await this.getOne(vhc_part_id).catch((err) => { throw new Error(err) })
            if (result) {
                vhc_id = result.vhc_id;
                part_id = result.part_id;
                partner = await this.partnerService.getPartnerById(part_id).catch((err) => { throw new Error(err) })
                vehicle = await this.vehicleService.getOne(vhc_id).catch((err) => { throw new Error(err) })
                if (vehicle) {
                    vehiclePartner["vhc"] = vehicle;
                    vehiclePartner["part"] = partner;
                    vehiclePartner["vhc_part_star"] = 4;
                    vehiclePartner = Object.assign(vehiclePartner, result);
                    if (vehicle.vhc_type_id == 1) {
                        vehiclePartner["vhc_part_name_short"] = vehicle.vhc_bran_name + " " + vehicle.vhc_modl_name + " " + result["vhc_part_year"]
                    }
                }
            }
        }
        return vehiclePartner;
    }

    public getDetailVehicle = async (vhc_part_id: number, type: number) => {
        let vhc_id, part_id, vehicle, partner;
        let vehiclePartner = {}

        if (vhc_part_id) {
            let result = await this.getOne(vhc_part_id).catch((err) => { throw new Error(err) })
            if (result) {
                vhc_id = result.vhc_id;
                part_id = result.part_id;
                var vhc_imgs;
                vehicle = await this.vehicleService.getDetailVehicle(vhc_id).catch((err) => { throw new Error(err) })
                partner = await this.partnerService.getDetailPartner(part_id, type).catch((err) => { throw new Error(err) });

                
                await this.imageService.findByImageTable("cx_vhc", vhc_id).catch(err => { throw new Error(err) })
                    .then(result => {
                        vhc_imgs = result;
                    })
                if (vhc_imgs) {
                    vehicle["vhc_imgs"] = vhc_imgs
                }

                if (vehicle && partner) {
                    vehiclePartner["vhc"] = vehicle;
                    vehiclePartner["part"] = partner;
                    vehiclePartner = Object.assign(vehiclePartner, result)
                    vehiclePartner["vhc_part_star"] = 4;
                    if (vehicle.vhc_type_id == 1) {
                        vehiclePartner["vhc_part_name_short"] = vehicle.vhc_bran_name + " " + vehicle.vhc_modl_name + " " + result["vhc_part_year"]
                    }
                }
            }
        }
        return vehiclePartner;
    }

    filterVehiclePart = async(book_rent, book_retn) =>{
        book_rent = new Date(book_rent);
        book_retn = new Date(book_retn);
        
        
    }

}