const route = require('express').Router()

const userModel = require('./../models/user.model')
const LoginServices = require('./../services/login.service')
const LoginController = require('./../controllers/login.controller')

const loginService = new LoginServices(userModel)
const loginController = new LoginController(loginService)

/**
 * - login route for all role
 */
route.post('/', loginController.login)



module.exports = route