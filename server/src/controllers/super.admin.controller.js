

class SuperAdminController {
    constructor(adminService){
        this.adminService = adminService
    }

    signUp = async (req, res) => {
        try {
            const data = await this.adminService.signUp(req.body)

            res.status(201).json({
                success: true,
                message: "Super_Admin created successfuly",
                data
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    }
    
    createAdmin = async (req, res) => {
        try {
            const data = await this.adminService.createAdmin(req.body)

            res.status(201).json({
                success: true,
                message: "Admin Created successfully",
                data
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    }
    createUser = async (req, res) => {
        try {
            const data = await this.adminService.createUser(req.body)

            res.status(201).json({
                success: true,
                message: "User Created successfully",
                data
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    }

    getAdmins = async (req, res) => {
        try {
            const data = await this.adminService.getAdmins()

            res.status(201).json({
                success: true,
                message: "Get Admins successfully",
                data
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    }

    updateAdmins = async (req, res) => {
        try {
            const {adminId} = req.params 
            const data = await this.adminService.updateAdmins(adminId, req.body)

            res.status(201).json({
                success: true,
                message: "Update Admins successfully",
                data
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    }
    
    updateUser = async (req, res) => {
        try {
            const {userId} = req.params 
            const data = await this.adminService.updateUser(userId, req.body)

            res.status(201).json({
                success: true,
                message: "Update User successfully",
                data
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    }

    deleteAdmin = async (req, res) => {
        try {
            const {adminid} = req.params
            await this.adminService.deleteAdmin(adminid)
            res.status(200).json({
                success: true,
                message: "Admin with its User deletaed successfully"
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
    deleteUser = async (req, res) => {
        try {
            const {userid} = req.params
            await this.adminService.deleteUser(userid)
            res.status(200).json({
                success: true,
                message: "User deletaed successfully"
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
}

module.exports = SuperAdminController