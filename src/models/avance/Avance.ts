import mongoose from 'mongoose';
import Project from '../proyectos/Project';
import User from '../usuarios/User';

const { Schema, model } = mongoose;

// interface Avance {
//   fecha: Date;
//   descripcion: string;
//   observaciones: [string];
//   proyecto: Schema.Types.ObjectId;
//   creadoPor: Schema.Types.ObjectId;
// }

const avanceSchema = new Schema({
  fecha: {
    type: Date,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  observaciones: [
    {
      type: String,
    },
  ],
  proyecto: {
    type: Schema.Types.ObjectId,
    ref: Project,
    required: true,
  },
  creadoPor: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
});

export default model('Avance', avanceSchema);
