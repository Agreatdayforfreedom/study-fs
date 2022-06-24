import {ApolloServer} from 'apollo-server-express';
import express from 'express';
import connectDB from './database';
import { resolvers } from './graphql/resolvers';
import { tipos } from './graphql/types';
import dotenv from 'dotenv';
dotenv.config();



const server = new ApolloServer({
    typeDefs: tipos,
    resolvers: resolvers
});
const app = express()

app.listen(4000, async() => {
    connectDB()
    await server.start();
    
    server.applyMiddleware({ app });

    console.log('server is ok');
})