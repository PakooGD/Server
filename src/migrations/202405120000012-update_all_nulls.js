// migrations/xxxx-update-null-constraints.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      // UpdateChannels modifications
      await Promise.all([
        queryInterface.changeColumn('update_channels', 'ota_uuid', {
          type: Sequelize.STRING,
          allowNull: true
        }, { transaction }),
        
        queryInterface.changeColumn('update_channels', 'target_version_code', {
          type: Sequelize.INTEGER,
          allowNull: true
        }, { transaction }),

        queryInterface.changeColumn('update_channels', 'version_code', {
          type: Sequelize.INTEGER,
          allowNull: true
        }, { transaction }),

        queryInterface.changeColumn('update_channels', 'version_name', {
          type: Sequelize.STRING,
          allowNull: true
        }, { transaction }),

        queryInterface.changeColumn('update_channels', 'version_type', {
          type: Sequelize.INTEGER,
          allowNull: true
        }, { transaction })
      ]);

      // Firmwares modifications
      await Promise.all([
        queryInterface.changeColumn('firmwares', 'app_name', {
          type: Sequelize.STRING,
          allowNull: true
        }, { transaction }),

        queryInterface.changeColumn('firmwares', 'app_type', {
          type: Sequelize.INTEGER,
          allowNull: true
        }, { transaction }),

        queryInterface.changeColumn('firmwares', 'display_name', {
          type: Sequelize.STRING,
          allowNull: true
        }, { transaction }),

        queryInterface.changeColumn('firmwares', 'group_name', {
          type: Sequelize.STRING,
          allowNull: true
        }, { transaction })
      ]);

      // FirmwareVersions modifications
      await Promise.all([
        queryInterface.changeColumn('firmware_versions', 'version_code', {
          type: Sequelize.INTEGER,
          allowNull: true
        }, { transaction }),

        queryInterface.changeColumn('firmware_versions', 'version_name', {
          type: Sequelize.STRING,
          allowNull: true
        }, { transaction }),

        queryInterface.changeColumn('firmware_versions', 'file_md5', {
          type: Sequelize.STRING,
          allowNull: true
        }, { transaction }),

        queryInterface.changeColumn('firmware_versions', 'file_path', {
          type: Sequelize.STRING,
          allowNull: true
        }, { transaction }),

        queryInterface.changeColumn('firmware_versions', 'file_size', {
          type: Sequelize.INTEGER,
          allowNull: true
        }, { transaction }),

        queryInterface.changeColumn('firmware_versions', 'file_url', {
          type: Sequelize.STRING,
          allowNull: true
        }, { transaction }),

        queryInterface.changeColumn('firmware_versions', 'lowest_available_version_uuid', {
          type: Sequelize.STRING,
          allowNull: true
        }, { transaction }),

        queryInterface.changeColumn('firmware_versions', 'release_note', {
          type: Sequelize.TEXT,
          allowNull: true
        }, { transaction }),

        queryInterface.changeColumn('firmware_versions', 'required', {
          type: Sequelize.INTEGER,
          allowNull: true
        }, { transaction }),

        queryInterface.changeColumn('firmware_versions', 'update_index', {
          type: Sequelize.INTEGER,
          allowNull: true
        }, { transaction }),

        queryInterface.changeColumn('firmware_versions', 'app_uuid', {
          type: Sequelize.STRING,
          allowNull: true
        }, { transaction }),

        queryInterface.changeColumn('firmware_versions', 'app_version_uuid', {
          type: Sequelize.STRING,
          allowNull: true
        }, { transaction }),

        queryInterface.changeColumn('firmware_versions', 'dependence_version_uuid', {
          type: Sequelize.STRING,
          allowNull: true
        }, { transaction })
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      // Revert UpdateChannels changes
      await Promise.all([
        queryInterface.changeColumn('update_channels', 'ota_uuid', {
          type: Sequelize.STRING,
          allowNull: false
        }, { transaction }),
        
        queryInterface.changeColumn('update_channels', 'target_version_code', {
          type: Sequelize.INTEGER,
          allowNull: false
        }, { transaction }),

        queryInterface.changeColumn('update_channels', 'version_code', {
          type: Sequelize.INTEGER,
          allowNull: false
        }, { transaction }),

        queryInterface.changeColumn('update_channels', 'version_name', {
          type: Sequelize.STRING,
          allowNull: false
        }, { transaction }),

        queryInterface.changeColumn('update_channels', 'version_type', {
          type: Sequelize.INTEGER,
          allowNull: false
        }, { transaction })
      ]);

      // Revert Firmwares changes
      await Promise.all([
        queryInterface.changeColumn('firmwares', 'app_name', {
          type: Sequelize.STRING,
          allowNull: false
        }, { transaction }),

        queryInterface.changeColumn('firmwares', 'app_type', {
          type: Sequelize.INTEGER,
          allowNull: false
        }, { transaction }),

        queryInterface.changeColumn('firmwares', 'display_name', {
          type: Sequelize.STRING,
          allowNull: false
        }, { transaction }),

        queryInterface.changeColumn('firmwares', 'group_name', {
          type: Sequelize.STRING,
          allowNull: false
        }, { transaction })
      ]);

      // Revert FirmwareVersions changes
      await Promise.all([
        queryInterface.changeColumn('firmware_versions', 'version_code', {
          type: Sequelize.INTEGER,
          allowNull: false
        }, { transaction }),

        queryInterface.changeColumn('firmware_versions', 'version_name', {
          type: Sequelize.STRING,
          allowNull: false
        }, { transaction }),

        queryInterface.changeColumn('firmware_versions', 'file_md5', {
          type: Sequelize.STRING,
          allowNull: false
        }, { transaction }),

        queryInterface.changeColumn('firmware_versions', 'file_path', {
          type: Sequelize.STRING,
          allowNull: false
        }, { transaction }),

        queryInterface.changeColumn('firmware_versions', 'file_size', {
          type: Sequelize.INTEGER,
          allowNull: false
        }, { transaction }),

        queryInterface.changeColumn('firmware_versions', 'file_url', {
          type: Sequelize.STRING,
          allowNull: false
        }, { transaction }),

        queryInterface.changeColumn('firmware_versions', 'lowest_available_version_uuid', {
          type: Sequelize.STRING,
          allowNull: false
        }, { transaction }),

        queryInterface.changeColumn('firmware_versions', 'release_note', {
          type: Sequelize.TEXT,
          allowNull: false
        }, { transaction }),

        queryInterface.changeColumn('firmware_versions', 'required', {
          type: Sequelize.INTEGER,
          allowNull: false
        }, { transaction }),

        queryInterface.changeColumn('firmware_versions', 'update_index', {
          type: Sequelize.INTEGER,
          allowNull: false
        }, { transaction }),

        queryInterface.changeColumn('firmware_versions', 'app_uuid', {
          type: Sequelize.STRING,
          allowNull: false
        }, { transaction }),

        queryInterface.changeColumn('firmware_versions', 'app_version_uuid', {
          type: Sequelize.STRING,
          allowNull: false
        }, { transaction }),

        queryInterface.changeColumn('firmware_versions', 'dependence_version_uuid', {
          type: Sequelize.STRING,
          allowNull: false
        }, { transaction })
      ]);
    });
  }
};