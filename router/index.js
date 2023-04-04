import express from 'express';
import routesController from '../controllers/routesController.js';
import { auth }  from '../lib/auth.js';

const router = express.Router();

/* Views */
router.get("/", auth, routesController.view);
router.get("/confirmation", auth, routesController.confirmationView);
router.get("/login", routesController.loginView);
router.get("/signup", routesController.signupView);

/* USER CONTROLLER */
router.post("/login", routesController.login);
router.post("/signup", routesController.signup);
router.post("/logout", routesController.logout);

/* TOKEN CONTROLLER */
router.post("/tokens/:code", routesController.getToken);

/* CHECKOUT CONTROLLER */
router.post("/charge", auth, routesController.charge);
router.post("/cards/get", auth, routesController.getCard);
router.post("/cards/create", auth, routesController.createCard);
router.post("/cards/remove", auth, routesController.removeCard);

export default router;
