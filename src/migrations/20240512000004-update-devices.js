'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('updates', {
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
      app_uuid: {
        type: Sequelize.UUID,
        allowNull: false
      },
      app_version_uuid: {
        type: Sequelize.UUID,
        allowNull: false
      },
      dependence_version_code: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      dependence_version_uuid: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
      },
      display_name: {
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
      group_name: {
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
        defaultValue: ''
      },
      pkg_name: {
        type: Sequelize.STRING,
        allowNull: false
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
      version_code: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      version_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    await queryInterface.addIndex('apps', ['app_name']);
    await queryInterface.addIndex('apps', ['pkg_name']);
    await queryInterface.addIndex('apps', ['version_code']);
    await queryInterface.addIndex('apps', ['app_uuid']);
    await queryInterface.addIndex('apps', ['app_version_uuid']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('apps');
  }
};