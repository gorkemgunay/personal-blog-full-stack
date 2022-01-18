import { DataTypes } from "sequelize";
import db from "../utility/db";

const Category = db.define("category", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
});

export default Category;
