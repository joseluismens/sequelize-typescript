import {RequestHandler} from 'express';
import { Persona } from '../models/persona';

export const crearPersona: RequestHandler = async (req,res,next)=>{
    const persona: Persona = await Persona.create({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        rut: req.body.rut,
        correo: req.body.correo
    });
    const data = {
        message: 'personas creada con éxito',
        persona,
        code: 200
    }
    return res.json(data);
}

export const eliminarPersona: RequestHandler = async (req,res,next)=>{
    const {id} = req.params;
    await Persona.destroy({
        where: {id}
    });
    const data = {
        message: 'personas eliminada con éxito',
        code: 200
    }
    return res.json(data);
}

export const listarPersona: RequestHandler = async (req,res,next)=>{
    const personas: Persona[] = await Persona.findAll();
    const data = {
        message: 'personas listada con éxito',
        personas,
        code: 200
    }
    return res.json(data);
}

export const actualizarPersona: RequestHandler = async (req,res,next)=>{
    const {id} = req.params;
    await Persona.update({
        ...req.body,
    },{
        where: {id}
    });

    const persona: any = await Persona.findByPk(id);
    const data = {
        message: 'personas editada con éxito',
        persona,
        code: 200
    }
    return res.json(data);
}

export const buscarPersona: RequestHandler = async (req,res,next)=>{

    const {id} = req.params;
    const persona: any = await Persona.findByPk(id);
    const data = {
        message: 'personas encontrada con éxito',
        persona,
        code: 200
    }
    return res.json(data);
}


