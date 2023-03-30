const mongoose = require('mongoose');
const axios = require('axios');

// connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/demo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// create a model based on the schema
const Data = require('./models/user')

// fetch data from API and save to MongoDB
const fetchData = async () => {
  try {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/users',
    );
    const listUser = response.data;

    const list = [];
    for (var user of listUser) {
      list.push(
        new Data({
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          address: {
            street: user.address.street,
            suite: user.address.suite,
            city: user.address.city,
            zipcode: user.address.zipcode,
            geo: {
              lat: user.address.geo.lat,
              lng: user.address.geo.lng,
            },
          },
          phone: user.phone,
          website: user.website,
          company: {
            name: user.company.name,
            catchPhrase: user.company.catchPhrase,
            bs: user.company.bs,
          },
        }),
      );
    }

    const promises = [];
    for (var data of list) {
      promises.push(
        data
          .save()
          .then(() => console.log('Data saved to MongoDB'))
          .catch((err) => console.log(err)),
      );
    }

    await Promise.all(promises);
    console.log('All data saved to MongoDB');
    mongoose.connection.close();
  } catch (err) {
    console.log(err);
  }
};

fetchData();