const PasswordHashing = require("../utils/password.hashing");
const TokenGenerator = require("../utils/token.generator");


/**
 * Login Service class
 */
class LoginServices {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async login(data) {
    try {
      const { email, password } = data;

      const user = await this.userModel.findOne({ email });

      if (!user) throw new Error("User not exist");

      const isValied = await PasswordHashing.comparing(password, user.password);

      if (!isValied) throw new Error("Password is not correct");

      const token = TokenGenerator.generateToke({
        userId: user._id,
        role: user.role,
      });

      const userdata = {
        userId: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      };
      return { userdata, token };
    } catch (error) {
      throw new Error(error.message);
    }
  }

}

module.exports = LoginServices;
