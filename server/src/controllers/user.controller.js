

class UserController {
    constructor(userService){
        this.userService = userService
    }

   
    createTask = async (req, res) => {
        try {
            const data = await this.userService.createTask(req.userid, req.body)

            res.status(201).json({
                success: true,
                message: "Task Created successfully",
                data
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    }
    
    getTask = async (req, res) => {
        try {
            const data = await this.userService.getTask(req.userid)

            res.status(201).json({
                success: true,
                message: "Task fetched successfully",
                data
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    }
    
    
    updateTask = async (req, res) => {
        try {
            const {taskid} = req.params 
            const data = await this.userService.updateTask(taskid, req.body)

            res.status(201).json({
                success: true,
                message: "Update task successfully",
                data
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    }

   
    deleteTask = async (req, res) => {
        try {
            const {taskid} = req.params
            await this.userService.deleteTask(taskid)
            res.status(200).json({
                success: true,
                message: "Task deletaed successfully"
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
}

module.exports = UserController