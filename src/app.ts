import express from "express";
import cors from "cors";
import { Logger } from "./helper/prettyConsole/PrettyLogger";
import { syncTables } from "./helper/tableSync/TableSync";
import { routes } from "./router/routes";

export const app = express();
const port = process.env.PORT || 3001;

app.listen(port, () => {
    Logger.prettyLog('Server Running')
})
app.use(express.json())
app.use(cors())
app.use(routes)
syncTables()