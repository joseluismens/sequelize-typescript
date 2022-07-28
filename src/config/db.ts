import { Sequelize } from 'sequelize-typescript';
import { Persona } from '../models/persona';
import { User } from '../models/user';

export const conection = new Sequelize({
    host: 'localhost',
    username: 'postgres',
    database:'sequelize',
    dialect: 'postgres',
    password: 'root',
    models:[Persona,User],
    //Evita mostrar mensaje en consola
    logging:true
  });
