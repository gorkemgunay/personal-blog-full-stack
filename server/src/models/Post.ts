import { DataTypes } from "sequelize";
import db from "../utility/db";

const Post = db.define("post", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  body: {
    type: DataTypes.TEXT,
  },
  shortDescription: {
    type: DataTypes.TEXT,
  },
  image: {
    type: DataTypes.TEXT,
  },
  pageTitle: {
    type: DataTypes.STRING,
  },
  metaKeywords: {
    type: DataTypes.TEXT,
  },
  metaDescription: {
    type: DataTypes.TEXT,
  },
});

export default Post;
