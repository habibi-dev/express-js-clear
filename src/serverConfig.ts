import express from "express";
import https from "https";
import fs from "fs";
import RequestTimerConfig from "./config/RequestTimerConfig";
import securityConfig from "./config/SecurityConfig";
import AppConfig from "./config/AppConfig";
import CorsConfig from "./config/CorsConfig";
import CronConfig from "./config/CronConfig";
import RouteManager from "./routes/RouteManager";
import pkg from "lodash";

function serverConfig() {

    const app = express();

    // Request timer config
    RequestTimerConfig(app);

    // Security config
    securityConfig(app);

    // App config
    AppConfig(app);

    // Cors config
    CorsConfig(app);

    // Cron jobs config
    CronConfig(app);

    // Dynamic routes
    new RouteManager(app).register();

    let options = {};

    const PRIVKEY = pkg.get(process, "env.PRIVKEY", "")
    const FULLCHAIN = pkg.get(process, "env.FULLCHAIN", "")
    const DOMAIN = pkg.get(process, "env.DOMAIN", "localhost")

    if (DOMAIN !== "localhost" && PRIVKEY.length) {
        // app.use(forceSSL)
        options = {
            key: fs.readFileSync(PRIVKEY),
            cert: fs.readFileSync(FULLCHAIN),
        };
    }

    app.set('trust proxy', 1);

    const server = https.createServer(options, app);
    return {app, server};
}

export default serverConfig;
