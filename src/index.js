const express = require('express');
const checkUserRoute = require('./routes/checkUser');
require('dotenv').config();
require('./models');
const { PORT } = require('./configs/index');

const app = express();

app.use('/users', checkUserRoute);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
