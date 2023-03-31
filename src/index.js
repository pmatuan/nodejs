const express = require('express');
const checkUserRoute = require('./routes/checkUser');
require('dotenv').config();
require('./models');
const { PORT } = require('./configs/index');

const app = express();

(async () => {
  require('./utils/fetchUser');
})();

app.use('/users', checkUserRoute);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
