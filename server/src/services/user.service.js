const PasswordHashing = require("../utils/password.hashing");
const TokenGenerator = require("../utils/token.generator");

class UserServices {
  constructor(taskModel, userModel) {
    this.taskModel = taskModel;
    this.userModel = userModel;
  }

  async createTask(userId, data) {
    try {
      const { task } = data;
      
      const newTask = await this.taskModel.create({
        task,
        userId
      });

      return newTask
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getTask(userId) {
    try {
      const tasks = await this.taskModel.find({ userId: userId });

      return tasks;
    } catch (error) {
      throw new Error(error.message);
    }
  }


  async updateTask(taskId, data) {
    try {
      const updatedTask = await this.taskModel.findByIdAndUpdate(taskId, { $set: { task: data.task }}, { returnDocument: 'after'})

      return updatedTask;

    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteTask(taskId) {
    try {
      await this.taskModel.deleteOne({ _id: taskId });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = UserServices;
