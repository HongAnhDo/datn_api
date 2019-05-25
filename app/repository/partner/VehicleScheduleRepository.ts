import { cx_vhc_schl as ScheduleVehicle } from "../../entities/partner/cx_vhc_schl"
import { Repository, getConnectionManager, LessThan, Between, UpdateResult, MoreThan } from "typeorm";

export default class VehiclePartRepository {
    private scheduleRepo: Repository<ScheduleVehicle>;
    constructor() {
        this.scheduleRepo = getConnectionManager().get("chungxe_partner").getRepository(ScheduleVehicle);
    }


    public async findVehicle(vhc_part_id, book_rent, book_retn): Promise<any> {
        let obj = {};

        if(book_rent && book_retn){
            obj["date_stat"] = LessThan(book_retn);
            obj["date_end"] = MoreThan(book_rent);
        }
        obj["vhc_part_id"] = vhc_part_id;
        
        var vehicles = await this.scheduleRepo
            .createQueryBuilder("cx_vhc_schl")
            .where(obj)
            .orderBy("cx_vhc_part.vhc_part_id", "DESC")
            .getMany();
        return vehicles;
    }

}