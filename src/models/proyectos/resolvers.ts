import { argsToArgsConfig } from "graphql/type/definition";
import Project from "./Project";
export const resolversProyecto = {
    Query: {
      Proyectos: async(parent: any, args: any) => {
        const proyectos = await Project.find().populate('lider').populate('avances').populate('inscripciones');
        return proyectos;
      }
    },
    Mutation: {
        crearProyecto: async (parent: any, args: any) => {
          const proyectoCreado = await Project.create({
            nombre: args.nombre,
            fechaInicio: args.fechaInicio,
            fechaFin: args.fechaFin,
            presupuesto: args.presupuesto,
            lider: args.lider,
            objetivos: args.objetivos,
          });
          return proyectoCreado;
        },
        editarProyecto: async (parent: any, args: any) => {
          const proyectoEditado = await Project.findByIdAndUpdate(args._id, {...args.campos}, {new: true});
          return proyectoEditado;
        },
        crearObjetivo: async(parent: any, args: any) => {
          const proyectoConObjetivo = await Project.findByIdAndUpdate(args.idProyecto, {
            $addToSet: {
              objetivos: {...args.campos}
            }
          }, {new:true});
          return proyectoConObjetivo;
        },
        editarObjectivo: async(parent: any, args: any) => {
          const objetivoEditado = await Project.findByIdAndUpdate(
            args.idProyecto,  
            {
              $set: {
                [`objetivos.${args.idObjetivo}.descripcion`]: args.campos.descripcion,
                [`objetivos.${args.idObjetivo}.tipo`]: args.campos.tipo,
              }
            }, {new: true});
          return objetivoEditado;
        },
        eliminarObjetivo: async(parent: any, args: any) => {
          const proyectoObjetivo = await Project.findByIdAndUpdate(
            {_id: args.idProyecto},
            {
              $pull: {
                objetivos: {
                  _id: args.idObjetivo
                }
              }
            }, {new: true}
            );
            return proyectoObjetivo;
        }
    }
}
