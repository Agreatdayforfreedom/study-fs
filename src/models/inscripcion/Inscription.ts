import mongoose from 'mongoose';
import { Enum_EstadoInscripcion } from '../enums/enums';
import Project from '../proyectos/Project';
import User from '../usuarios/User';

const { Schema, model } = mongoose;
interface Inscription {
  estado: Enum_EstadoInscripcion;
  fechaIngreso: Date;
  fechaEgreso: Date;
  proyecto: mongoose.Schema.Types.ObjectId;
  estudiante: mongoose.Schema.Types.ObjectId;
}

const inscriptionSchema = new Schema<Inscription>({
  estado: {
    type: String,
    enum: Enum_EstadoInscripcion,
    default: Enum_EstadoInscripcion.PENDIENTE,
    required: true,
  },
  fechaIngreso: {
    type: Date,
    required: false,
  },
  fechaEgreso: {
    type: Date,
    required: false,
  },
  proyecto: {
    type: Schema.Types.ObjectId,
    ref: Project,
    required: true,
  },
  estudiante: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
});

export default model('Inscription', inscriptionSchema);
