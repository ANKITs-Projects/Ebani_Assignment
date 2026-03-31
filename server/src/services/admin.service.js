const PasswordHashing = require("../utils/password.hashing");
const TokenGenerator = require("../utils/token.generator");


/**
 * Admin service class
 */
class AdminServices {
  constructor(adminModel) {
    this.adminModel = adminModel;
  }

  async createUser(adminId, data) {
    try {
      const { name, email, password, phone } = data;

      const user = await this.adminModel.findOne({ email });
      if (user) {
        throw new Error("User already exist");
      }

      const hashedPassword = await PasswordHashing.hashing(password);

      const newUser = await this.adminModel.create({
        name,
        email,
        phone,
        password: hashedPassword,
        createdBy: adminId,
        role: "User",
      });

      return {
        neme: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        userId: newUser._id,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getUsers(adminId) {
    try {
      const users = await this.adminModel.find({ createdBy: adminId });

      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  }


  async updateUser(userId, data) {
    try {
      const updatedUser = await this.adminModel.findByIdAndUpdate(userId, { $set: { name: data.name, phone: data.phone, }}, { returnDocument: 'after'})

      return updatedUser;

    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteUser(userId) {
    try {
      await this.adminModel.deleteOne({ _id: userId });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = AdminServices;
