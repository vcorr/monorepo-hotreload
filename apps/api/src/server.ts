import { json, urlencoded } from "body-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import * as yup from 'yup';

interface todo {
  id: number,
  text: string
}
let todoDB: Array<todo> = [{ id: 1, text: 'Hunt stuff' },{ id: 2, text: 'Learn fire.js' }]
const createContext = ({
  req,
  res
}: trpcExpress.CreateExpressContextOptions) => {
  return {req,res};

  };

type Context = inferAsyncReturnType<typeof createContext>;

const trcp = initTRPC.context<Context>().create();

const appRouter = trcp.router({
  addTodo: trcp.procedure.input(yup.object({text: yup.string().required()})).mutation((req)=>{
    const todo = {id: todoDB.length+1, text: req.input.text};
    todoDB.push(todo);
    return todo;
  }),
  getTodos: trcp.procedure.query(() => {
    return todoDB;
  })

});

export type AppRouter = typeof appRouter;


export const createServer = () => {
  const app = express();

  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .use(
      '/',
      trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
      }),
    );
  
  return app;
};
