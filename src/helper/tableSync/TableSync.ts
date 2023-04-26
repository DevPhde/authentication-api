import { sequelize } from "../../database/DatabaseConfig";
import { Logger } from "../prettyConsole/PrettyLogger";

export async function syncTables() {
    sequelize.sync()
    .then(() => Logger.prettyLog('Tables synced sucessfully'))
    .catch((err) => Logger.prettyLog(`Error synchronizing tables: ${err}`))
}