import { IResContext } from './interface';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import mongoose from 'mongoose';
import 'dotenv/config';
import { importSchema } from 'graphql-import';
import * as path from 'path';
import * as fs from 'fs';
import { mergeSchemas, makeExecutableSchema } from 'graphql-tools';
import { GraphQLSchema, __Field } from 'graphql';
import { verification, refreshController } from './controller';

const PORT = process.env.PORT;
mongoose.Promise = global.Promise;

const connection = () => {
  mongoose.connect(
    'mongodb://localhost:27017/graphauth',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
    () => {
      console.log(
        `\n🚀 Connected to Database successfuly! \n🚀🚀 Server ready at http://localhost:${PORT}/graphql \n🚀🚀🚀 Lift off!😊 \n`
      );
    }
  );
};

const startSever = async () => {
  const app = express();
  app.use(helmet());
  app.use(compression());
  app.use(cors());
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.post('/verification/:token', verification);
  app.post('/refresh_token', refreshController);

  const schemas: GraphQLSchema[] = [];
  const folders = fs.readdirSync(path.join(__dirname, './modules'));
  folders.forEach((folder) => {
    const { resolvers } = require(`./modules/${folder}/resolvers`);
    const typeDefs = importSchema(
      path.join(__dirname, `./modules/${folder}/schema.graphql`)
    );
    schemas.push(makeExecutableSchema({ resolvers, typeDefs }));
  });

  const server = new ApolloServer({
    context: ({ req, res }: IResContext) => ({ req, res }),
    schema: mergeSchemas({ schemas }),
  });

  server.applyMiddleware({ app, path: '/graphql', cors: false });

  app.listen({ port: PORT }, () => {
    connection();
  });
  return app;
};

startSever();
