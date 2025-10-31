import express from "express";
import { getAllContacts, addContacts } from "../controller/contactController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/add",isAuthenticated, addContacts);
router.get("/get",isAuthenticated, getAllContacts);
export default router;
