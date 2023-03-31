const User = require('../models/user');

const getAllUsers = async () => {
  try {
    const userList = await User.find({});
    return userList;
  } catch (err) {
    console.error(err);
    return null;
  }
};

module.exports = { getAllUsers };
