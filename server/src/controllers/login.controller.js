

class LoginController {
    constructor(loginService){
        this.loginService = loginService
    }

    login = async (req, res) => {
        try {
            const data = await this.loginService.login(req.body)

            res.cookie("token", data.token).status(200).json({
                success: true,
                message: `${data.userdata.role} login successfuly`,
                user: data.userdata
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    }

}

module.exports = LoginController