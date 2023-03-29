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

// create a schema for your data
const userSchema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    username: String,
    email: String,
    address: {
      street: String,
      suite: String,
      city: String,
      zipcode: String,
      geo: {
        lat: String,
        lng: String,
      },
    },
    phone: String,
    website: String,
    company: {
      name: String,
      catchPhrase: String,
      bs: String,
    },
  },
  {
    collection: "thu",
    versionKey: false, // Here You have to add.
  },
);

// create a model based on the schema
const Data = mongoose.model('Data', userSchema);

// fetch data from API and save to MongoDB
axios
  .get('https://jsonplaceholder.typicode.com/users')
  .then((response) => {
    const listFetch = response.data;
    return listFetch;
  })
  .then((listFetch) => {
    const list = [];
    for (var data of listFetch) {
      list.push(
        new Data({
          id: data.id,
          name: data.name,
          username: data.username,
          email: data.email,
          address: {
            street: data.address.street,
            suite: data.address.suite,
            city: data.address.city,
            zipcode: data.address.zipcode,
            geo: {
              lat: data.address.geo.lat,
              lng: data.address.geo.lng,
            },
          },
          phone: data.phone,
          website: data.website,
          company: {
            name: data.company.name,
            catchPhrase: data.company.catchPhrase,
            bs: data.company.bs,
          },
        }),
      );
    }
    return list;
  })
  .then((list) => {
    for (var data of list) {
      data
        .save()
        .then(() => console.log('Data saved to MongoDB'))
        .catch((err) => console.log(err));
    }
  });
