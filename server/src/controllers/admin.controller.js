

class AdminController {
    constructor(adminService){
        this.adminService = adminService
    }

    createUser = async (req, res) => {
        try {
            const data = await this.adminService.createUser(req.userid, req.body)

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
    
    getUsers = async (req, res) => {
        try {
            const data = await this.adminService.getUsers(req.userid)

            res.status(201).json({
                success: true,
                message: "User fetched successfully",
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

module.exports = AdminController