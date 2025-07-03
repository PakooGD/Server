import { Table, Column, Model, DataType, AllowNull, PrimaryKey, AutoIncrement, Default, ForeignKey } from 'sequelize-typescript';
import { Firmwares, UpdateChannels } from '.';

@Table({
  tableName: 'channels_firmwares',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class ChannelsToFirmware extends Model {
  @ForeignKey(() => UpdateChannels)
  @Column(DataType.INTEGER)
  channel_id!: number;

  @ForeignKey(() => Firmwares)
  @Column(DataType.INTEGER)
  firmware_id!: number;
}