'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('update_channels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      channel: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ota_uuid: {
        type: Sequelize.UUID,
        allowNull: false
      },
      target_version_code: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      version_code: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      version_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      version_type: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    // Добавляем индексы для часто используемых полей
    await queryInterface.addIndex('update_channels', ['channel']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('update_channels');
  }
};