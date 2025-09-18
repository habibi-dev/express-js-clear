import serverConfig from "./serverConfig";
import dotenv from "dotenv";
import Logger from "./services/Logger";

async function bootstrap() {
    try {

        Logger.initialize()

        dotenv.config();

        const {server, app} = serverConfig();

        const port = Number(process.env.PORT) || 3000;
        const domain = process.env.DOMAIN || "localhost";
        const env = process.env.NODE_ENV || "development";

        function printServerInfo(isDev: boolean) {
            if (isDev) {
                Logger.info("Is Running Developer Mod! 🤓🛠️");
                Logger.info(`Visit: http://localhost:${port}/api/status`);
            } else {
                const protocol = port === 443 ? "https" : "http";
                Logger.info("Is Running! 🙂😍😋😈");
                Logger.info(`Visit: ${protocol}://${domain}${port === 443 ? "" : `:${port}`}/status`);
            }
        }

        if (domain === "localhost" || env === "localhost") {
            app.listen(port, () => printServerInfo(true));
        } else {
            server.listen(port, domain, () => printServerInfo(false));
        }
    } catch (error) {
        Logger.error(`Failed to start application: ${error}`);
        process.exit(1);
    }
}

process.on('SIGTERM', async () => {
    // cleanup logic
    Logger.warn('SIGTERM signal received: closing HTTP server');
    process.exit(0);
});

bootstrap().then();