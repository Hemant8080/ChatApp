import { Router } from "express";
import { getAllContacts, getContactForDm, searchContacts } from "../controller/ContactController.js";
import { verifyToken } from "../middlewares/AuthMiddelware.js";

const contactRoutes = Router()

contactRoutes.post("/search" , verifyToken, searchContacts)
contactRoutes.get("/get-contacts-for-dm" , verifyToken, getContactForDm)
contactRoutes.get("/get-all-contacts" , verifyToken, getAllContacts)

export default contactRoutes