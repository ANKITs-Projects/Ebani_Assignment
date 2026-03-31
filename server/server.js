require('dotenv').config({path: "./.env"})
const app = require("./src/app")
const db = require('./src/config/db')


/**
 * for vercel
 */

// const port = process.env.PORT


// app.listen(port, () => {
//     console.log("Server is running on port: ",port)
// })