import { argsToArgsConfig } from "graphql/type/definition";
import Inscription from "../inscripcion/Inscription";
import User from "../usuarios/User";
import Project from "./Project";
export const resolversProyecto = {
    Proyecto: {
      lider: async(parent: any, args: any) => {
        const user = await User.findOne({
          _id: parent.lider._id,
        });
        return user;
      },
      inscripciones: async(parent: any, args: any) => {
        const inscripciones = await Inscription.find({
          proyecto: parent._id
        });
        return inscripciones;
      }
    },
    Query: {
      Proyectos: async(parent: any, args: any) => {
        const proyectos = await Project.find();
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
