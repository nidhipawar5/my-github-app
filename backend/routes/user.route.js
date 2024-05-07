import express from "express"
import { getUserProfileAndRepos, getLikes, likeProfile } from "../controlers/user.controller.js"
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.js";



const router = express.Router()

router.get("/profile/:username", getUserProfileAndRepos)

//likes route 
router.get("/likes", ensureAuthenticated, getLikes);

//like a profile
router.post("/like/:username", ensureAuthenticated, likeProfile);

export default router