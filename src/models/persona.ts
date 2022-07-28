import {Table,Model,Column,DataType} from 'sequelize-typescript';

@Table({
    timestamps:false,
    tableName: "persona"
})

export class Persona extends Model{

    @Column({
        type: DataType.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    })
    id!:number;

    @Column({
        type: DataType.STRING,
        allowNull:false
    })
    nombre!:string;

    @Column({
        type: DataType.STRING,
        allowNull:false
    })
    apellido!:string;

    @Column({
        type: DataType.STRING,
        allowNull:false
    })
    correo!:string;

    @Column({
        type: DataType.STRING,
        allowNull:false
    })
    rut!:string;
}