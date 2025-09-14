/**
 * Middleware that records the start time of each request.
 * Capturing this value enables later calculation of request duration.
 */
import { Request, Response, NextFunction } from "express";

export default function requestTimer(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    req.startTime = Date.now();
    next();
}
