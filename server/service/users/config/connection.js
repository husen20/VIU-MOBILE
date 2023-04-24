const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://husen20:Y1KbNWbMdzkAzSvn@cluster0.p0sc3b7.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);

let dbName = 'Movie-Theater';

async function connectDb() {
  try {
    await client.connect();
    dbName = client.db(dbName);

    console.log('Connected successfully to server');
    return dbName;
  } catch (error) {
    client.close();
    console.log(error);
  }
}

function getDB() {
  return dbName;
}

module.exports = { connectDb, getDB };
