import { Router } from 'express';
import contactController from '../controllers/contactController.js';
import { auth } from "../middlewares/auth.js";

const router = Router();

// create contact
router.post("/contact",  auth, contactController.createContact );

// fetch contact
router.get("/mycontacts",  auth, contactController.getmyContacts );

// update Contact
router.put("/contacts/:id", auth, contactController.updateContact );

// delete contact
router.delete("/delete/:id", auth, contactController.deleteContact );

// to get a single contact
router.get("/contact/:id", auth, contactController.getContactById );

export  { router as contactRouter };

