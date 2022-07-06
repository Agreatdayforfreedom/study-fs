import User from "../../models/usuarios/User";
import bcrypt from 'bcrypt';
import { generateToken } from "../../utils/generateToken";

const resolversAutenticacion = {
    Mutation: {
        registro: async(parent: any, args: any) => {
            const salt = await bcrypt.genSalt(10);
            const passwordHashed = await bcrypt.hash(args.password, salt);
            const usuarioCreado = await User.create({
                nombre: args.nombre,
                apellido: args.apellido,
                identificacion: args.identificacion,
                correo: args.correo,
                estado: args.estado,
                rol: args.rol,
                password: passwordHashed
            })
            return {
                token: generateToken({
                    _id: usuarioCreado._id,
                    nombre: usuarioCreado.nombre,
                    apellido: usuarioCreado.apellido,
                    identificacion: usuarioCreado.identificacion,
                    correo: usuarioCreado.correo,
                    estado: usuarioCreado.estado,
                    rol: usuarioCreado.rol,
                })
            }
        },
        login: async (parent: any, args: any) => {
            const usuarioEncontrado = await User.findOne({ correo: args.correo });
            if(usuarioEncontrado) {
                if (await bcrypt.compare(args.password, usuarioEncontrado.password)) {
                    return {
                      token: generateToken({
                        _id: usuarioEncontrado._id,
                        nombre: usuarioEncontrado.nombre,
                        apellido: usuarioEncontrado.apellido,
                        identificacion: usuarioEncontrado.identificacion,
                        correo: usuarioEncontrado.correo,
                        rol: usuarioEncontrado.rol,
                        foto: usuarioEncontrado.foto,
                      }),
                    };
                  }
            }
        },
        refreshToken: async(parent: any, args: any, context: any) => {
            if (!context.userData){
                return{
                    error: 'token no valido'
                }
            } else {
                return {
                    token: generateToken({
                        _id: context.userData._id,
                        nombre: context.userData.nombre,
                        apellido: context.userData.apellido,
                        identificacion: context.userData.identificacion,
                        correo: context.userData.correo,
                        rol: context.userData.rol,
                        foto: context.userData.foto,
                    }),
                };
            }

        }
    }
}

export {resolversAutenticacion};