import {Router} from "express";
import HomeController from "../controller/HomeController";
import RouteInterface from "../../../contracts/RouteInterface";

// Create router instance for home module
const router = Router();

// Register home index route
router.get('/', HomeController.index);

// Export route configuration
const homeRoute: RouteInterface = {
    basePath: '/',
    router,
};

export default homeRoute;
