import helmet from "helmet";
import rateLimit from "express-rate-limit";
import {Express} from "express";

export default function securityConfig(app: Express) {
    app.use(helmet({
        crossOriginResourcePolicy: false,
    }));
    app.use(
        "/api",
        rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
            standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
            legacyHeaders: false, // Disable the `X-RateLimit-*` headers
            message: {
                status: false,
                message: "Too many requests, please try again later.",
            },
        })
    );
}