import { resolversAvance } from "../models/avance/resolvers";
import { resolversInscripcion } from "../models/inscripcion/resolvers";
import { resolversProyecto } from "../models/proyectos/resolvers";
import { resolversUsuario } from "../models/usuarios/resolvers";
import { resolversAutenticacion } from "./auth/resolvers";

export const resolvers = [resolversProyecto, resolversUsuario, resolversAvance, resolversInscripcion, resolversAutenticacion];