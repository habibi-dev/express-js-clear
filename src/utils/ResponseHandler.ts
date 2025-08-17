
import {Request, Response} from "express"

export default class ResponseHandler {
    static async Error(req: Request, res: Response, status = 400, message: any, otherData = {}) {
        const data = {status: false, message: message, ...otherData}
        if (req.hasOwnProperty('logger')) {
            // const logger = pkg.get(req, "logger") as Logger
            // pkg.set(req, "logger.response", data)
            // pkg.set(req, "logger.level", "error")
            // logger.save()
        } else {
            // await new Logger({
            //     uri: req.url,
            //     ip: ip(req),
            //     method: req.method,
            //     user: {}/*await UserService.getUserByToken(req.header('auth-token'))*/,
            //     request: {body: req.err.body, params: req.params, query: req.query},
            //     response: data,
            //     level: "system-error",
            //     systemErrorType: req.err.type
            // }).save()
        }
        return res.status(status).json(data);
    }

    static async Success(req: Request, res: Response, data: object) {
        const nData = {status: true, data}
        const cloneData = JSON.parse(JSON.stringify(nData));

        if (cloneData && cloneData.hasOwnProperty('data') && cloneData.data.hasOwnProperty('token'))
            cloneData.data.token = "***************"

        // req.logger.response = cloneData
        // req.logger.save()
        return res.status(200).json(nData);
    }
}