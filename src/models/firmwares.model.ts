import { Table, Column, Model, DataType, AllowNull, PrimaryKey, AutoIncrement, HasMany, ForeignKey,BelongsToMany } from 'sequelize-typescript';
import { UpdateChannels, ChannelsToFirmware,FirmwareVersions } from '.';

@Table({
  tableName: 'firmwares',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Firmwares extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(true)
  @Column(DataType.STRING)
  app_name!: string;

  @AllowNull(true)
  @Column(DataType.INTEGER)
  app_type!: number;

  @AllowNull(true)
  @Column(DataType.STRING)
  display_name!: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  group_name!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  pkg_name!: string;

  @HasMany(() => FirmwareVersions)
  firmware_versions!: FirmwareVersions[];

  @BelongsToMany(() => UpdateChannels, () => ChannelsToFirmware)
  channels!: UpdateChannels[];
}