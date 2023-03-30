const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
require('dotenv').config();
const { PORT } = require('./configs');
const app = express();

let userList;

// connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/demo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// get all users
const getAllUsers = async () => {
  try {
    userList = await User.find({});
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
};

app.get('/users/:userName', async (req, res) => {
  const name = req.params.userName;
  if (!userList){
    await getAllUsers();
  }
  let user = userList.find((user) =>
    user.name.toLowerCase().includes(name.toLowerCase()),
  );
  if (user) {
    res.send(`User ${user.name} exists in the database`);
  } else {
    res.send(`User ${name} does not exist in the database`);
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
