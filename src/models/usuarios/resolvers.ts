import User from "./User";

export const resolversUsuario = {
    Query: {
        Usuarios: async(parent: any, args: any) => {

            const usuarios = await User.find({...args.filtro}).populate('inscripciones');

            return usuarios;
        },
        Usuario: async(parent: any, args: any) => {
            const usuario = await User.findOne({_id: args._id});
            return usuario;
        }
    },
    Mutation: {
        crearUsuario: async(parent: any, args: any) => {
            const usuarioCreado = await User.create({
                nombre: args.nombre,
                apellido: args.apellido,
                identificacion: args.identificacion,
                correo: args.correo,
                estado: args.estado,
                rol: args.rol,
            });

            if (Object.keys(args).includes('estado')){
                usuarioCreado.estado = args.estado;
            }
            return usuarioCreado;
        },
        editarUsuario: async(parent:any, args:any) => {
            const usuarioEditado = await User.findByIdAndUpdate(args._id, {
                nombre: args.nombre,
                apellido: args.apellido,
                identificacion: args.identificacion,
                correo: args.correo,
                rol: args.rol,
                estado: args.estado 
            }, {
                new: true
            });
            return usuarioEditado;
        },
        editarPerfil: async(parent:any, args:any) => {
            const usuarioEditado = await User.findByIdAndUpdate(args._id, {...args.campos}, {new: true})
            return usuarioEditado;
        },
        eliminarUsuario: async(parent: any, args: any) => {
            if(Object.keys(args).includes('_id')) {
                const usuarioEliminado = await User.findOneAndDelete({_id: args._id}); 
                return usuarioEliminado;
            } else if (Object.keys(args).includes('correo')) {
                const usuarioEliminado = await User.findOneAndDelete({_id: args._id}); 
                return usuarioEliminado;
            }
        }


    }
}