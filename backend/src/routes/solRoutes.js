import express from "express";
import { getSolBalanceController, getLastFiveTransactions } from "../web3Controller/solController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
const router = new express.Router();
router.get("/getSolBalance/:walletAddress",isAuthenticated, getSolBalanceController);
router.get('/getTransaction/:walletAddress',isAuthenticated, getLastFiveTransactions);
export default router;
