import { Sequelize } from "sequelize";

const db = new Sequelize(
  "postgres://gorkemgunay@localhost:5432/personal-blog",
  {
    define: {
      freezeTableName: true,
    },
    logging: false,
  }
);

export default db;
