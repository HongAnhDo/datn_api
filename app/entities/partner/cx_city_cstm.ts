import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("cx_city_cstm",{schema:"chungxe_partner"})
export class cx_city_cstm {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"city_cstm_id"
        })
    city_cstm_id:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"city_cstm_name"
        })
    city_cstm_name:string;
        

    @Column("varchar",{ 
        nullable:true,
        length:45,
        name:"city_cstm_name_en"
        })
    city_cstm_name_en:string | null;
        
}
