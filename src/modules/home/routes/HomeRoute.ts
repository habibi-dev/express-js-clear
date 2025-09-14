import {Router} from "express";
import HomeController from "../controller/HomeController";
import InterfaceRoute from "../../../contracts/InterfaceRoute";

// Create router instance for home module
const router = Router();

// Register home index route
router.get('/', HomeController.index);

// Export route configuration
const homeRoute: InterfaceRoute = {
    basePath: '/',
    router,
};

export default homeRoute;
