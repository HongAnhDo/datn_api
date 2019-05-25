import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("cx_vhc_img",{schema:"chungxe_vehicle"})
@Index("name_UNIQUE",["vhc_img_name",],{unique:true})
export class cx_vhc_img {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"vhc_img_id"
        })
    vhc_img_id:number;
        

    @Column("varchar",{ 
        nullable:false,
        unique: true,
        length:255,
        name:"vhc_img_name"
        })
    vhc_img_name:string;
        

    @Column("varchar",{ 
        nullable:true,
        length:255,
        default:"http://chungxe.vn/images/",
        name:"vhc_img_link"
        })
    vhc_img_link:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:255,
        name:"vhc_img_web"
        })
    vhc_img_web:string | null;
        

    @Column("int",{ 
        nullable:true,
        name:"vhc_tbl_id"
        })
    vhc_tbl_id:number | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:128,
        name:"vhc_tbl_name"
        })
    vhc_tbl_name:string | null;
        
}
