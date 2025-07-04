'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      // Для таблицы UpdateChannels (если есть uuid поля)
      await queryInterface.changeColumn('update_channels', 'ota_uuid', {
        type: Sequelize.STRING,
        allowNull: true,
      }, { transaction });

      // Для таблицы FirmwareVersions
      await queryInterface.changeColumn('firmware_versions', 'app_version_uuid', {
        type: Sequelize.STRING,
        allowNull: true,
      }, { transaction });
      
      await queryInterface.changeColumn('firmware_versions', 'dependence_version_uuid', {
        type: Sequelize.STRING,
        allowNull: true,
      }, { transaction });

      await queryInterface.changeColumn('firmware_versions', 'app_uuid', {
        type: Sequelize.STRING,
        allowNull: true,
      }, { transaction });

      await queryInterface.changeColumn('firmware_versions', 'lowest_available_version_uuid', {
        type: Sequelize.STRING,
        allowNull: true,
      }, { transaction });
      // Добавьте другие таблицы по аналогии
    });
  },

  async down(queryInterface, Sequelize) {
    // Возвращаем обратно к UUID (осторожно - может сломать данные)
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.changeColumn('UpdateChannels', 'ota_uuid', {
        type: Sequelize.UUID,
        allowNull: true,
      }, { transaction });

      // Повторите для других таблиц
    });
  }
};