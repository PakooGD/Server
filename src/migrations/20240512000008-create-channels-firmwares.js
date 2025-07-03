'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('channels_firmwares', {
      channel_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'update_channels',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      firmware_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'firmwares',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Добавляем индексы для внешних ключей
    await queryInterface.addIndex('channels_firmwares', ['channel_id']);
    await queryInterface.addIndex('channels_firmwares', ['firmware_id']);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('channels_firmwares');
  }
};