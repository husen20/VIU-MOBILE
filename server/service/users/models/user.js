const { ObjectId } = require('mongodb');
const { getDB } = require('../config/connection');

class User {
  static getCollection() {
    return getDB().collection('Users');
  }

  static getUsers() {
    return this.getCollection().find().project({ password: 0 }).toArray();
  }

  static getUser(params) {
    if (params.email) {
      return this.getCollection().findOne({ email: params.email });
    }

    if (params.id) {
      return this.getCollection().findOne({ _id: new ObjectId(params.id) });
    }
  }

  static createUser(data) {
    return this.getCollection().insertOne(data);
  }

  static deleteUser(param) {
    return this.getCollection().deleteOne({ _id: new ObjectId(param) });
  }
}

module.exports = User;
