import {Router} from 'express';

import { eliminarPersona, buscarPersona, crearPersona, actualizarPersona, listarPersona } from '../controller/persona.controller';

const router = Router();

router.get("/persona", listarPersona);
router.post("/persona", crearPersona);
router.put("/persona/:id", actualizarPersona);
router.delete("/persona/:id", eliminarPersona);
router.get("/persona/:id", buscarPersona);

export default router;