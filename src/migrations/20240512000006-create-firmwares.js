'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('firmwares', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      app_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      app_type: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      display_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      group_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      pkg_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addIndex('firmwares', ['app_name']);
    await queryInterface.addIndex('firmwares', ['pkg_name']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('firmwares');
  }
};