import express from "express";
import { userLogin, userRegistration , createProspect, getSelector} from "../controller/user-controller.js";
import setContests from '../controller/contest-controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();
router.post("/login", userLogin);
router.post("/register", userRegistration);

router.post("/prospectForm" , createProspect);
router.get("/user/selector" , getSelector);
router.post("/selector/contests" , setContests);
//router.get('/upload/video' , videoUpload);
//router.get("/mongo-video" ,getVideo);

export default router;
