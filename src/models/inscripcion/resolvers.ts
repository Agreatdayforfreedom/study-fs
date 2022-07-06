import Project from "../proyectos/Project";
import User from "../usuarios/User";
import Inscription from "./Inscription";

const resolversInscripcion = {

    Inscripcion: {
        proyecto: async(parent: any, args: any) => {
            return await Project.findOne({_id: parent.proyecto});
        },
        estudiante: async(parent: any, args: any) => {
            return await User.findOne({_id: parent.estudiante});
        }
    },

    Query: {
        inscripciones: async(parent: any, args: any) => {
            const inscripciones = await Inscription.find();
            return inscripciones;
        },

    },
    Mutation: {
        crearInscripcion: async(parent: any, args: any) => {
            const inscripcion = await Inscription.create({
                fechaIngreso: args.fechaIngreso,
                fechaEgreso: args.fechaEgreso,
                proyecto: args.proyecto,
                estudiante: args.estudiante,
            });
            return inscripcion
        },
        aprobarInscripcion: async(parent: any, args: any) => {
            const inscripcionAprobada = await Inscription.findByIdAndUpdate(args.id, {
                estado: 'ACEPTADO',
                fechaIngreso: Date.now()
            }, {
                new: true
            });
            return inscripcionAprobada;
        }
    }
}

export { resolversInscripcion };