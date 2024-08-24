import process from "node:process";
import { buildServer } from "./server.js";
const PORT = 8000;
const HOST = '127.0.0.1';
let server = null;
try {
    server = await buildServer();
    server?.listen({ port: PORT, host: HOST });
}
catch (error) {
    server?.log.error(error);
    process.exit(1);
}
//# sourceMappingURL=app.js.map