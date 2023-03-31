const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../utils/getAllUsers');
const { logResponse } = require('../utils/logRespone');

let userList;

(async () => {
  userList = await getAllUsers();
})();

router.get('/:userName', async (req, res) => {
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

module.exports = router;
