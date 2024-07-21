/* DEPENDENCIES */
const User = require("../models/User");

/* VARIABLES */
const userData = [
  {
    first: "admin",
    last: "",
    username: "admin",
    email: "admin@gmail.com",
    password: "",
  },
];

/* FUNCTIONS */
const seedUser = () => User.bulkCreate(userData);

/* EXPORTS */
module.exports = seedUser;
