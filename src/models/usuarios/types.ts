import { gql } from 'apollo-server-express';
const tiposUsuarios = gql`
    type Usuario {
        _id: ID!
        nombre: String!
        apellido: String!
        identificacion: String!
        correo: String!
        estado: Enum_EstadoUsuario
        rol: Enum_Rol!
        inscripciones: [Inscripcion]
        avancesCreados: [Avance]
        proyectosLiderados: [Proyecto]

    }

    type Query {
        Usuarios: [Usuario]
        Usuario(_id: String!): Usuario
    }

    type Mutation {
        crearUsuario(
            nombre: String!
            apellido: String!
            identificacion: String!
            correo: String!
            estado: Enum_EstadoUsuario!
            rol: Enum_Rol!
            password: String!
        ): Usuario

        editarUsuario(
            _id: String!
            nombre: String!
            apellido: String!
            identificacion: String!
            correo: String!
            estado: Enum_EstadoUsuario!
            rol: Enum_Rol
        ): Usuario

        eliminarUsuario(_id: String, correo: String): Usuario
    }
`;

export { tiposUsuarios };