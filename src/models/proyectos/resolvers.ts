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
        }
    }
}
