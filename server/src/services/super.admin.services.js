const PasswordHashing = require("../utils/password.hashing");
const TokenGenerator = require("../utils/token.generator");

class SuperAdminServices {
  constructor(superAdminModel) {
    this.superAdminModel = superAdminModel;
  }

  async signUp(data) {
    try {
      const { name, email, phone, password } = data;

      const user = await this.superAdminModel.findOne({ email });

      if (user) throw new Error("User already exist");

      const hashedPassword = await PasswordHashing.hashing(password);

      const newUser = await this.superAdminModel.create({
        name: name,
        email: email,
        phone: phone,
        password: hashedPassword,
        role: "SuperAdmin",
      });

      return newUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }


  async createAdmin(data) {
    try {
      const { name, email, password, phone } = data;
      const user = await this.superAdminModel.findOne({ email });
      if (user) {
        throw new Error("Admin user already exist");
      }

      const hashedPassword = await PasswordHashing.hashing(password);

      const newAdmin = await this.superAdminModel.create({
        name,
        email,
        phone,
        password: hashedPassword,
        role: "Admin",
      });

      return {
        neme: newAdmin.name,
        email: newAdmin.email,
        phone: newAdmin.phone,
        adminId: newAdmin._id,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createUser(data) {
    try {
      const { name, email, password, phone, adminId } = data;
      if (!adminId) {
        throw new Error("Admin is require for creating user");
      }

      const admin = await this.superAdminModel.findById(adminId);
      if (!admin) {
        throw new Error("Admin is not exist..");
      }
      if (admin.role != "Admin") {
        throw new Error(" Role is not Admin");
      }

      const user = await this.superAdminModel.findOne({ email });
      if (user) {
        throw new Error("User already exist");
      }

      const hashedPassword = await PasswordHashing.hashing(password);

      const newUser = await this.superAdminModel.create({
        name,
        email,
        phone,
        password: hashedPassword,
        createdBy: admin._id,
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

  async getAdmins() {
    try {
      const admins = await this.superAdminModel.find({ role: "Admin" });

      const groupedArray = [];

      for (const admin of admins) {
        const users = await this.superAdminModel.find({ createdBy: admin._id });
        groupedArray.push({ admin, users });
      }

      return groupedArray;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateAdmins(adminId, data) {
    try {
      const updatedAdmin = await this.superAdminModel.findByIdAndUpdate(adminId, { $set: { name: data.name, phone: data.phone, }}, { returnDocument: 'after'})

      return updatedAdmin;
      
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateUser(userId, data) {
    try {
      const updatedUser = await this.superAdminModel.findByIdAndUpdate(userId, { $set: { name: data.name, phone: data.phone, }}, { returnDocument: 'after'})

      return updatedUser;

    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteAdmin(adminId) {
    try {
      await this.superAdminModel.deleteMany({
        $or: [{ _id: adminId }, { createdBy: adminId }],
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteUser(userId) {
    try {
      await this.superAdminModel.deleteOne({ _id: userId });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = SuperAdminServices;
