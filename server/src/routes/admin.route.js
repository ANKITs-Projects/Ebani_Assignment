const route = require('express').Router()

const userModel = require('./../models/user.model')
const AdminServices = require('./../services/admin.service')
const AdminController = require('./../controllers/admin.controller')
const AuthMiddleware = require('../middlewares/auth.middleware')
const RoleMiddleware = require('../middlewares/authorized.middleware')

const adminService = new AdminServices(userModel)
const adminController = new AdminController(adminService)



/**
 * - crud operation for admin route
 */
route.post('/createuser',AuthMiddleware.verifyToken, RoleMiddleware.authorizeRoles("Admin"), adminController.createUser)

route.get('/getusers',AuthMiddleware.verifyToken, RoleMiddleware.authorizeRoles("Admin"), adminController.getUsers)

route.put('/updateUser/:userId',AuthMiddleware.verifyToken, RoleMiddleware.authorizeRoles("Admin"), adminController.updateUser)

route.delete('/deleteuser/:userid',AuthMiddleware.verifyToken, RoleMiddleware.authorizeRoles("Admin"), adminController.deleteUser)


module.exports = route