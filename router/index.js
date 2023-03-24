import express from 'express';
import routesController from '../controllers/routesController.js';
import { auth }  from '../lib/auth.js';

const router = express.Router();

/* Views */
router.get("/", auth, routesController.view);
router.get("/confirmation", auth, routesController.confirmationView);
router.get("/login", routesController.loginView);
router.get("/signup", routesController.signupView);
router.get("/pin", routesController.pinView);

/* api */
router.post("/login", routesController.login);

export default router;
