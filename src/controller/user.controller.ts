import { Response, Request } from "express";

import { User } from "../models/user";

export default class UserController {

    static listAll = (req: Request, res: Response) => {
        User.findAll().then((result: User[]) => res.json(result)).catch((err: object) => console.error(err));
    };

    static newUser = (req: Request, res: Response) => {
        const { nombres, apellidos, tipo_identificacion, identificacion, correo, telefono, password } = req.body;

        User.findOne({ where: { correo: correo } })
            .then((result: any) => {
                if (result) {
                    return res.status(500).json({message:"el correo ya ha sido registrado"})
                } else {
                    User.create({
                        ...req.body
                    }).then((result: object) => res.status(200).json(result)).catch((err: object) => console.error(err));
                }

            }).catch((err: object) => console.error(err));

    }

    static getUser = (req: Request, res: Response) => {

        const { id } = req.params;
        User.findByPk(id)
            .then((result: any) => {
                if (result) {
                    return res.status(200).json(result);
                }
                return res.status(500).json({ message: "Usuario no encontrado" });
            }).catch((err: object) => console.error(err));


    }

    static deleteUser = async (req: Request, res: Response) => {
        const { id } = req.params;

        User.destroy({
            where: {
                id: id
            }
        }).then((result: any) => {
            if (result) return res.status(200).json({ message: "Usuario eliminado exitosamente" });

            return res.status(404).json({ message: "Usuario no encontrado" });


        }).catch((err: object) => console.error(err))

    };

    static updateUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { nombres,apellidos, tipo_identificacion,identificacion,correo,telefono } = req.body;

        const user = User.findOne({
            where:{
              id:parseInt(id)
            }
          }).then(
            (result:any)=>{
                if (!result) {
                    return res.status(404).json({ message: "Usuario no encontrado" });
                }
          })
          .catch((error:object)=>console.error(error));
        
        

        User.update(
            {
              nombres:nombres,
              apellidos:apellidos,
              tipo_identificacion:tipo_identificacion,
              identificacion:identificacion,
              correo:correo,
              telefono:telefono,
              
            },
            {where:{
              id:id
            }
          }).then((result:object)=>{
            if (result) {
                return res.status(200).json({message:"usuario actualizado"});
            }else{
                return res.status(500).json({message:"error al actualizar"});
            }
          }).catch((error:object)=>console.error(error))
        
        
      };



}