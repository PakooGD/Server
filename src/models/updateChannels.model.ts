import { Table, Column, Model, DataType, AllowNull, PrimaryKey, AutoIncrement, Default, BelongsToMany } from 'sequelize-typescript';
import { Firmwares, ChannelsToFirmware } from '.';

@Table({
  tableName: 'update_channels',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class UpdateChannels extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  channel!: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  ota_uuid!: string;

  @AllowNull(true)
  @Column(DataType.INTEGER)
  target_version_code!: number;

  @AllowNull(true)
  @Column(DataType.INTEGER)
  version_code!: number;

  @AllowNull(true)
  @Column(DataType.STRING)
  version_name!: string;

  @AllowNull(true)
  @Column(DataType.INTEGER)
  version_type!: number;

  @BelongsToMany(() => Firmwares, () => ChannelsToFirmware)
  firmwares!: Firmwares[];
}