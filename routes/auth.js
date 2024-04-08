import { Router }  from 'express';
import authController from '../controllers/authController.js';
import { auth } from '../middlewares/auth.js';
import XMLHttpRequestUpload from '../middlewares/uploadfile.js';


const router = Router();

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/me", auth, authController.getMyDetails);

export { router as authRouter };

