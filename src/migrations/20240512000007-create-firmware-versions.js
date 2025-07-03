'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('firmware_versions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firmware_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'firmwares',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      version_code: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      version_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      file_md5: {
        type: Sequelize.STRING,
        allowNull: false
      },
      file_path: {
        type: Sequelize.STRING,
        allowNull: false
      },
      file_size: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      file_url: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lowest_available_version_code: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      lowest_available_version_uuid: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      release_note: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      required: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      update_index: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      app_uuid: {
        type: Sequelize.UUID,
        allowNull: true,
        defaultValue: null
      },
      app_version_uuid: {
        type: Sequelize.UUID,
        allowNull: true,
        defaultValue: null
      },
      dependence_version_code: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      dependence_version_uuid: {
        type: Sequelize.UUID,
        allowNull: true,
        defaultValue: null
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

    await queryInterface.addIndex('firmware_versions', ['firmware_id']);
    await queryInterface.addIndex('firmware_versions', ['version_code']);
    await queryInterface.addIndex('firmware_versions', ['app_uuid']);
    await queryInterface.addIndex('firmware_versions', ['app_version_uuid']);
    await queryInterface.addConstraint('firmware_versions', {
      fields: ['firmware_id', 'version_code'],
      type: 'unique',
      name: 'unique_app_version'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('firmware_versions');
  }
};