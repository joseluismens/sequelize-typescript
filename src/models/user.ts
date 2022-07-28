import {Table,Model,Column,DataType} from 'sequelize-typescript';
import * as bcrypt from "bcrypt";

@Table({
    timestamps:false,
    tableName: "users"
})

export class User extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    })
    id!:number;

    @Column({
        type: DataType.STRING,
        allowNull:true
    })
    nombres!:string;

    @Column({
        type: DataType.STRING,
        allowNull:true
    })
    apellidos!:string;

    @Column({
        type: DataType.STRING,
        allowNull:true
    })
    tipo_identificacion!:string;

    @Column({
        type: DataType.STRING,
        allowNull:true
    })
    identificacion!:string;

    @Column({
        type: DataType.STRING,
        allowNull:true
    })
    correo!:string;

    @Column({
        type: DataType.STRING,
        allowNull:false,
        unique:true,
        set(value: any) {
            const hash = bcrypt.hashSync(value, 8);
            this.setDataValue('password', hash);
        }
    })
    password!:string;

    @Column({
        type: DataType.STRING,
        allowNull:true
    })
    telefono!:string;

    


}
