const Log = require('../models/log');

const logResponse = async (message) => {
  try {
    const log = new Log({ message });
    await log.save();
    console.log('Log saved to MongoDB');
  } catch (err) {
    console.log(err);
  }
};

module.exports = { logResponse };
