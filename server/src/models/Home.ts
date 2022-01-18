import { DataTypes } from "sequelize";
import db from "../utility/db";

const Home = db.define("home", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  subTitle: {
    type: DataTypes.STRING,
  },
  pageTitle: {
    type: DataTypes.STRING,
  },
  metaDescription: {
    type: DataTypes.TEXT,
  },
  metaKeywords: {
    type: DataTypes.TEXT,
  },
});

export default Home;
