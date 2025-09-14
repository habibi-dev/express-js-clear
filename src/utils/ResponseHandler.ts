import {Request, Response} from "express";

export default class ResponseHandler {
    /**
     * Calculates duration from the moment the request was received.
     * Using a dedicated method avoids duplication in response helpers.
     */
    private static calculateDuration(req: Request): number {
        const start = req.startTime ?? Date.now();
        return Date.now() - start;
    }

    /**
     * Handles error responses while including request duration for monitoring.
     */
    static async Error(req: Request, res: Response, status = 400, message: any, otherData = {}) {
        const duration = ResponseHandler.calculateDuration(req);
        const data = {status: false, message, duration, ...otherData};
        return res.status(status).json(data);
    }

    /**
     * Handles successful responses and appends request duration.
     */
    static async Success(req: Request, res: Response, data: object) {
        const duration = ResponseHandler.calculateDuration(req);
        const nData = {status: true, data, duration};
        return res.status(200).json(nData);
    }
}
