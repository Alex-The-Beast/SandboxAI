import express from "express"
import { sendMessageController, getChannelByIdController,getMessagesByChannelIdController ,getAllChannelController} from "../controller/chatController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
const router=express.Router();
// router.get('/',)
router.post('/message',isAuthenticated,sendMessageController)
router.get('/channel',isAuthenticated,getAllChannelController)
router.get('/channel/:userId',isAuthenticated,getChannelByIdController)
router.get('/messages/:channelId',isAuthenticated,getMessagesByChannelIdController)
export default router