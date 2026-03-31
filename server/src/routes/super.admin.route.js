const route = require('express').Router()

const userModel = require('./../models/user.model')
const SuperAdminServices = require('./../services/super.admin.services')
const SuperAdminController = require('./../controllers/super.admin.controller')
const AuthMiddleware = require('../middlewares/auth.middleware')
const RoleMiddleware = require('../middlewares/authorized.middleware')

const superAdminService = new SuperAdminServices(userModel)
const superAdminController = new SuperAdminController(superAdminService)


/**
 * - SignUp route for Super Admin
 */
route.post('/signup', superAdminController.signUp)

/**
 * - CRUD operation for Super Admin
 */

route.post('/createadmin',AuthMiddleware.verifyToken, RoleMiddleware.authorizeRoles("SuperAdmin"), superAdminController.createAdmin)
route.post('/createuser',AuthMiddleware.verifyToken, RoleMiddleware.authorizeRoles("SuperAdmin"), superAdminController.createUser)

route.get('/getadmins',AuthMiddleware.verifyToken, RoleMiddleware.authorizeRoles("SuperAdmin"), superAdminController.getAdmins)

route.put('/updateadmins/:adminId',AuthMiddleware.verifyToken, RoleMiddleware.authorizeRoles("SuperAdmin"), superAdminController.updateAdmins)
route.put('/updateuser/:userId',AuthMiddleware.verifyToken, RoleMiddleware.authorizeRoles("SuperAdmin"), superAdminController.updateUser)

route.delete('/deleteuser/:userid',AuthMiddleware.verifyToken, RoleMiddleware.authorizeRoles("SuperAdmin"), superAdminController.deleteUser)

/**
 * - Delete admin will also delete the user which was created by admin or under admin
 */
route.delete('/deleteadmin/:adminid',AuthMiddleware.verifyToken, RoleMiddleware.authorizeRoles("SuperAdmin"), superAdminController.deleteAdmin)

module.exports = route