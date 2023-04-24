const express = require('express');
const { connectDb } = require('./config/connection');
const Controller = require('./controllers/controller');
const errorHandler = require('./midleware/errorhandle');
const app = express();
const port = process.env.PORT || 4001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/users', Controller.getUsers);
app.post('/users', Controller.createUser);
app.delete('/users/:id', Controller.deleteUser);
app.get('/users/:id', Controller.getUser);

app.use(errorHandler);

connectDb().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
