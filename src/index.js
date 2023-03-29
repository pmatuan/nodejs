const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const { PORT } = require('./configs');
const timeToFetchAgain = 2; // 2 minutes

let userData;
let lastFetch;

const fetchUserData = async () => {
  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users');
    userData = res.data;
    lastFetch = Date.now();
    console.log('Data fetched successfully');
  } catch (err) {
    console.error(err);
  }
};

fetchUserData();

app.get('/users/:userName', async (req, res) => {
  const name = req.params.userName;
  if (!userData || Date.now() - lastFetch > timeToFetchAgain * 60 * 1000) {
    await fetchUserData();
  }
  const user = userData.find((user) =>
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
