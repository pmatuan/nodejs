const express = require('express');
require('dotenv').config();
require('./models');
const { PORT } = require('./configs/index');

const app = express();

(async () => {
  require('./test/fetchUser');
})();

require('./routes')(app);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
