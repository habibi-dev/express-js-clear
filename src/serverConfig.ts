import express, { Express } from "express";
import type { ServerOptions } from "https";
import https from "https";
import fs from "fs";
import RequestTimerConfig from "./config/RequestTimerConfig";
import securityConfig from "./config/SecurityConfig";
import AppConfig from "./config/AppConfig";
import CorsConfig from "./config/CorsConfig";
import CronConfig from "./config/CronConfig";
import ModuleMiddlewareConfig from "./config/ModuleMiddlewareConfig";
import RouteManager from "./routes/RouteManager";

type AppConfigurator = (app: Express) => void;

const configurators: AppConfigurator[] = [
    RequestTimerConfig,
    securityConfig,
    AppConfig,
    CorsConfig,
    ModuleMiddlewareConfig,
    CronConfig,
];

function applyConfigurators(app: Express, configs: AppConfigurator[]): void {
    // Applies each configuration to a shared app instance
    configs.forEach((configure) => configure(app));
}

function getHttpsOptions(): ServerOptions {
    // Builds HTTPS options when running in a production environment
    const { PRIVKEY, FULLCHAIN, DOMAIN = "localhost" } = process.env;
    if (DOMAIN !== "localhost" && PRIVKEY && FULLCHAIN) {
        return {
            key: fs.readFileSync(PRIVKEY),
            cert: fs.readFileSync(FULLCHAIN),
        };
    }
    return {};
}

export default function serverConfig() {
    const app = express();

    applyConfigurators(app, configurators);

    // Registers dynamic routes after core configurations
    new RouteManager(app).register();

    app.set("trust proxy", 1);

    const server = https.createServer(getHttpsOptions(), app);
    return { app, server };
}
