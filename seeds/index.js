const sequelize = require('../config/connection');

const seed = async () => {
  await sequelize.sync({ force: true });

  process.exit(0);
}

seed();