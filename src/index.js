const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const Log = require('./models/log');
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
  }
};

// log response
const logResponse = async (message) => {
  try {
    const log = new Log({ message });
    await log.save();
    console.log('Log saved to MongoDB');
  } catch (err) {
    console.log(err);
  }
};

app.get('/users/:userName', async (req, res) => {
  const name = req.params.userName;
  if (!userList) {
    await getAllUsers();
  }
  let user = userList.find((user) =>
    user.name.toLowerCase().includes(name.toLowerCase()),
  );
  if (user) {
    await logResponse(`User ${user.name} exists in the database`);
    res.status(200).json(user);
  } else {
    await logResponse(`User ${name} does not exist in the database`);
    res.status(404).json({ message: 'User not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
