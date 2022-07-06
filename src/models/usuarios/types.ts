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
        foto: String
        inscripciones: [Inscripcion]
        avancesCreados: [Avance]
        proyectosLiderados: [Proyecto]

    }

    input CamposEditarPerfil {
        _id: ID
        nombre: String
        apellido: String
        identificacion: String
        foto: String
    }

    input filtroUsuarios {
        _id: ID
        identificacion: String
        correo: String
        estado: Enum_EstadoUsuario
        rol: Enum_Rol
        
    }

    type Query {
        Usuarios(filtro: filtroUsuarios): [Usuario]
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

        editarPerfil(_id: String!, campos: CamposEditarPerfil!): Usuario
    }
`;

export { tiposUsuarios };