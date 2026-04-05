// import { checkDatabaseConnection, prepareHttpServer } from "./lib";
import { env, validateEnv } from "@repo/lib/env";
import { createAdapter } from "@socket.io/redis-streams-adapter";
import next from "next";
import { Redis } from "ioredis";
import { Server } from "socket.io";
import { authenticateSocket } from "./auth";
import { prepareHttpServer } from "./lib";
import { runStartupTasks } from "./startup";

const dev = env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port, dir: "./packages/next" });
const handler = app.getRequestHandler();

var io: Server;

validateEnv();

app.prepare().then(async () => {
  const httpServer = await prepareHttpServer(handler);

  await runStartupTasks();

  io = new Server(httpServer);

  const redisClient = new Redis();

  io.adapter(createAdapter(redisClient));

  io.use(authenticateSocket);

  io.on("connection", async (_socket) => {
    // if (socket.data.auth.invalidSession === true) {
    //   socket.emit("invalidSession");
    // }
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
