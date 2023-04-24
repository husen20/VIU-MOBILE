const User = require('../models/user');
const bcrypt = require('bcrypt');

class Controller {
  static async getUsers(req, res, next) {
    try {
      const data = await User.getUsers();

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getUser(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        throw { name: 'NotFound' };
      }

      const data = await User.getUser({ id: id });

      if (!data) {
        throw { name: 'NotFound' };
      }

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        throw { name: 'NotFound' };
      }

      await User.deleteUser({ id: id });

      res.status(200).json({ message: 'Deleted Successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async createUser(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;

      if (email || !email) {
        if (email) {
          let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
          const validation = regex.test(email);

          if (!validation) {
            throw { name: 'formatEmail' };
          }

          const emailUniq = await User.getUser({ email: email });

          if (emailUniq) {
            throw { name: 'emailUniq' };
          }
        } else {
          throw { name: 'requiredEmail' };
        }
      }

      if (password || !password) {
        if (!password) {
          throw { name: 'requiredPassword' };
        } else if (password.length < 5) {
          throw { name: 'formatPassword' };
        }
      }

      const data = {
        username,
        email,
        password: bcrypt.hashSync(password, 8),
        phoneNumber,
        address,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await User.createUser(data);

      res.status(200).json({ message: 'Created Succesfully' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
