const express = require('express')
const cors = require('cors')
const cookieParser = require("cookie-parser");
const superAdminRoute = require('./routes/super.admin.route')
const adminRoute = require('./routes/admin.route')
const userRoute = require('./routes/user.route')
const loginRoute = require('./routes/login.route')

/**
 * - an express app
 */
const app = express()

/**
 * - enbuild middleware
 */
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true 
}))
app.use(cookieParser());
app.use(express.json())


/**
 * routes for login 
 * and role based
 */
app.use('/api/login', loginRoute)
app.use('/api/superadmin', superAdminRoute)
app.use('/api/admin', adminRoute)
app.use('/api/user', userRoute)


module.exports = app