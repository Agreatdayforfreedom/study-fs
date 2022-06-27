import { gql } from 'apollo-server-express';
import { tiposAvance } from '../models/avance/types';
import { tiposEnums } from '../models/enums/types';
import { tiposInscripcion } from '../models/inscripcion/types';
import { tiposProyecto } from '../models/proyectos/types';
import { tiposUsuarios } from '../models/usuarios/types';



const tiposGlobales = gql`
    scalar Date
`;

export const tipos = [tiposGlobales, tiposEnums, tiposProyecto, tiposUsuarios, tiposAvance, tiposInscripcion];