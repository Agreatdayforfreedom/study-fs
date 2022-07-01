import mongoose from 'mongoose';
import { Enum_EstadoUsuario, Enum_Rol } from '../enums/enums';



export interface IUser {
    correo: string;
    password: string;
    identificacion: string;
    nombre: string;
    apellido: string;
    rol: string;
    estado: string;
}

const userSchema = new mongoose.Schema<IUser>({
    correo: { type: String, required: true, unique: true},
    identificacion: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true},
    rol: {type: String, required: true, enum: Enum_Rol},
    estado: {type: String, enum: Enum_EstadoUsuario, default: Enum_EstadoUsuario.PENDIENTE}
});

export default mongoose.model<IUser>('User', userSchema);