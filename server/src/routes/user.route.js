const route = require('express').Router()

const taskModel = require('./../models/task.model')
const userModel = require('./../models/user.model')
const UserServices = require('./../services/user.service')
const UserController = require('./../controllers/user.controller')
const AuthMiddleware = require('../middlewares/auth.middleware')
const RoleMiddleware = require('../middlewares/authorized.middleware')

const userService = new UserServices(taskModel,userModel)
const userController = new UserController(userService)



/**
 * - Crud operation for user 
 */
route.post('/createtask',AuthMiddleware.verifyToken, RoleMiddleware.authorizeRoles("User"), userController.createTask)

route.get('/gettask',AuthMiddleware.verifyToken, RoleMiddleware.authorizeRoles("User"), userController.getTask)

route.put('/updatetask/:taskid',AuthMiddleware.verifyToken, RoleMiddleware.authorizeRoles("User"), userController.updateTask)

route.delete('/delettask/:taskid',AuthMiddleware.verifyToken, RoleMiddleware.authorizeRoles("User"), userController.deleteTask)


module.exports = route