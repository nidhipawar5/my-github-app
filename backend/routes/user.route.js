import express from "express"
import { getUserProfileAndRepos } from "../controlers/user.controller.js"


const router = express.Router()

router.get("/profile/:username", getUserProfileAndRepos)
//likes route 
//like a profile

export default router