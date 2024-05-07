import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import passport from 'passport'
import session from 'express-session'

import "./passport/github.auth.js"

import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import exploreRoutes from "./routes/explore.route.js"

import connectMongoDB from './db/connectMongoDB.js'

dotenv.config()

const app =express()
app.use(cors())

app.use(session({ secret: "keyboard cat", resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());



app.get("/", (req,res) => {
    res.send("Server is ready")
})

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/explore", exploreRoutes)

app.listen(5001, () => {
    console.log("Server started on http://localhost:5001");
    connectMongoDB()
})