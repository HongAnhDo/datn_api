import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("cx_vhc_seat",{schema:"chungxe_vehicle"})
@Index("vhc_seat_num_UNIQUE",["vhc_seat_num",],{unique:true})
export class cx_vhc_seat {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"vhc_seat_id"
        })
    vhc_seat_id:number;
        

    @Column("int",{ 
        nullable:false,
        unique: true,
        name:"vhc_seat_num"
        })
    vhc_seat_num:number;
        
}
