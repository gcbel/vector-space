/* DEPENDENCIES */
const sequelize = require("../config/connection");
const seedUsers = require("./user-seeds.js");
const seedPosts = require("./post-seeds.js");
const seedComments = require("./comment-seeds.js");

/* FUNCTIONS */
const seedAll = async () => {
  console.log("\n SEEDING DATABASE \n");
  await sequelize.sync({ force: true });
  console.log("\n DATABASE SYNCED \n");

  await seedUsers();
  console.log("\n USERS SEEDED \n");

  await seedPosts();
  console.log("\n POSTS SEEDED \n");

  await seedComments();
  console.log("\n COMMENTS SEEDED \n");

  console.log("\n SEEDING COMPLETE \n");
  process.exit(0);
};

seedAll();
