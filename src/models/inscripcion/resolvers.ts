import Inscription from "./Inscription";

const resolversInscripcion = {
    Query: {
        inscripciones: async(parent: any, args: any) => {
            const inscripciones = await Inscription.find().populate('proyecto').populate('estudiante');
            return inscripciones;
        },
    },
    Mutation: {
        crearInscripcion: async(parent: any, args: any) => {
            const inscripcion = await Inscription.create({
                estado: args.estado,
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