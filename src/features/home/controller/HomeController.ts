import {Request, Response} from "express"
import ResponseHandler from "../../../utils/ResponseHandler";


export default class HomeController {
    static index(req: Request, res: Response) {
        try {

            return ResponseHandler.Success(req, res, {
                message: 'Is Running! 🙂😍😋😈',
                timestamp: new Date().toISOString(),
                uptime: process.uptime(),
                environment: process.env.NODE_ENV || 'development'
            })
        } catch (error) {
            return ResponseHandler.Error(req, res, 500, error)
        }
    }
}