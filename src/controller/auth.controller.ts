import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { validate } from "class-validator";
import bcrypt from 'bcrypt';

import config from "../config/config";
import { User } from "../models/user";
import checkIfUnencryptedPasswordIsValid from "../config/utils";

export default class AuthController {

    static login = async (req: Request, res: Response) => {

        const { correo, password } = req.body;
        if (!(correo && password)) return res.status(500).send({message:'error'});

        User.findOne({ where:{correo:correo} })
            .then((result:User | null)=>{
                if (!result) {
                    return res.status(500).send({ message: "Este usuario no esta registrado en nuestro sistema" });
                }
        
                if(!checkIfUnencryptedPasswordIsValid(password,result.password)) return  res.status(500).send({ message: "contraseña incorrecta" });
               
                const token = jwt.sign(
                    {
                        id: result.id,
                        nombres:result.nombres,
                        apellidos:result.apellidos,
                        correo:result.correo
                    },
                    config.jwtSecret,
                    { expiresIn: '1h' }
                );
                res.header('auth-token', token).json({id:result.id,username:result.correo,token:token});
            })
      
            
    }

    static changePassword = (req: Request, res: Response) => {

        console.log(req.header('auth-token'));
        
        const id = res.locals.jwtPayload.id;
        console.log(id);
        
        const { oldPassword, newPassword } = req.body;

        if (!(oldPassword && newPassword)) return res.status(400).send();
        
         User.findByPk(id).then((result:User | null)=>{
            if (!result) return res.status(500).json({message:"usuario no encontrado"});

            if(!bcrypt.compareSync(oldPassword, result.password)) return  res.status(500).send({ message: "contraseña incorrecta" });
            User.update({
                password:newPassword
            },
            {where:{
                id:id
            }}).then((result:any)=> res.status(200).json({message:"contraseña actutalizada"}))
            .catch((error:object)=>console.error(error));
            
         }).catch((error:object)=>console.error(error));
    
        
       
    };


    



}