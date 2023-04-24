const axios = require('axios');
const redis = require('../config/redis');
const URL_MONGO = process.env.USER_URL || 'http://localhost:4001';

const UserDefs = `#graphql

    type Users {
        _id: String
        username: String
        email: String
        phoneNumber: String
        address: String
    }

    type Query {
      users: [Users]
      userById(_id: String): Users
    }
    

    input UserForm {
        username: String
        password: String
        email: String
        phoneNumber: String
        address: String
    }

    type Response {
      message: String
    }

    type Mutation {
      addUser(newUser: UserForm) : Response
      deleteUser(id: String) : Response
    }

  `;

const UserResolvers = {
  Query: {
    users: async () => {
      try {
        const userCache = await redis.get('app:users');

        if (userCache) {
          return JSON.parse(userCache);
        }

        const { data } = await axios({
          url: `${URL_MONGO}/users`,
        });

        await redis.set('app:users', JSON.stringify(data));

        return data;
      } catch (error) {
        console.log(error);
      }
    },

    userById: async (parent, args) => {
      try {
        const { data } = await axios({
          url: `${URL_MONGO}/users/${args._id}`,
        });

        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      try {
        const { username, password, email, phoneNumber, address } = args.newUser;

        const { data } = await axios({
          url: `${URL_MONGO}/users`,
          method: 'POST',
          data: {
            username,
            password,
            email,
            phoneNumber,
            address,
          },
        });

        await redis.del('app:users');

        return data;
      } catch (error) {
        console.log(error);
      }
    },

    deleteUser: async (parent, args) => {
      try {
        const { data } = await axios({
          url: `${URL_MONGO}/users/${args.id}`,
          method: 'DELETE',
        });

        await redis.del('app:users');

        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = { UserResolvers, UserDefs };
