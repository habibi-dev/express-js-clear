import {Express} from "express";
import HomeController from "../modules/home/controller/HomeController";

export default (app: Express) => {

    // Index
    app.get('/', HomeController.index);
}