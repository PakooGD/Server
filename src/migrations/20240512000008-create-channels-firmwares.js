'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('channels_firmwares', {
      channel_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'update_channels',
          key: 'id'
        }
      },
      firmware_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'firmwares',
          key: 'id'
        }
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

    await queryInterface.addConstraint('channels_firmwares', {
      fields: ['channel_id', 'firmware_id'],
      type: 'primary key',
      name: 'channel_firmwares_pkey'
    });
    await queryInterface.addIndex('channels_firmwares', ['channel_id']);
    await queryInterface.addIndex('channels_firmwares', ['firmware_id']);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('channels_firmwares');
  }
};