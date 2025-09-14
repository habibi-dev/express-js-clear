import serverConfig from "./serverConfig";
import dotenv from "dotenv";

dotenv.config();

const {server, app} = serverConfig();

const port = Number(process.env.PORT) || 3000;
const domain = process.env.DOMAIN || "localhost";
const env = process.env.NODE_ENV || "development";

function printServerInfo(isDev: boolean) {
    if (isDev) {
        console.log("Is Running Developer Mod! 🙂🛠️");
        console.log(`Visit: http://localhost:${port}/status`);
    } else {
        const protocol = port === 443 ? "https" : "http";
        console.log("Is Running! 🙂😍😋");
        console.log(`Visit: ${protocol}://${domain}${port === 443 ? "" : `:${port}`}/status`);
    }
}

if (domain === "localhost" || env === "localhost") {
    app.listen(port, () => printServerInfo(true));
} else {
    server.listen(port, domain, () => printServerInfo(false));
}
