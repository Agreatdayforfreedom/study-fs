import {ApolloServer} from 'apollo-server-express';
import express from 'express';
import cors from 'cors';
import connectDB from './database';
import { resolvers } from './graphql/resolvers';
import { tipos } from './graphql/types';
import dotenv from 'dotenv';
import { validateToken } from './utils/generateToken';
dotenv.config();



const getUserData = (token: any) => {
    const verify = validateToken(token.split(' ')[1]);
    console.log(verify);
    if(verify) {
        console.log(verify.data);
        return verify.data;
    } else { return null; }
}

const server = new ApolloServer({
    typeDefs: tipos,
    resolvers: resolvers,
    context: ({req}) => {
        const userData = getUserData(req.headers.authorization);
        return { userData };
    }
});
const app = express()

// Middleware
app.use(cors());

app.use(express.json());

app.listen(4000, async() => {
    connectDB()
    await server.start();
    
    server.applyMiddleware({ app });

    console.log('server is ok');
})