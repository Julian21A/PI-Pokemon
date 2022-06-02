const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Pokemon",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      sprite: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "https://i.pinimg.com/originals/a6/4f/c7/a64fc73a5a257f7c6797205bd46d4842.png"
      },

      health: {
        type: DataTypes.INTEGER,
        defaultValue: "50",
      },

      strength: {
        type: DataTypes.INTEGER,
        defaultValue: "50",
      },

      defense: {
        type: DataTypes.INTEGER,
        defaultValue: "50",
      },

      speed: {
        type: DataTypes.INTEGER,
        defaultValue: "50",
      },

      height: {
        type: DataTypes.INTEGER,
        defaultValue: "50",
      },

      weight: {
        type: DataTypes.INTEGER,
        defaultValue: "50",
      },

      createdInDb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },

    {
      timestamps: false,
    }
  );
};
