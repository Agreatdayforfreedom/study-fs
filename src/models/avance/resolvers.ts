import Avance from "./Avance"
export const resolversAvance ={
    Query: {
        Avances: async(parent:any, args:any) => {
            const avances = await Avance.find().populate('proyecto').populate('creadoPor');
            return avances;
        }
    },
    Mutation: {
        crearAvance: async (parent:any, args:any) => {
            const avanceCreado = await Avance.create({
                fecha: args.fecha,
                descripcion: args.descripcion,
                proyecto: args.proyecto,
                creadoPor: args.creadoPor
            });
            return avanceCreado;
        }
    }
}