import { Table, Column, Model, DataType, AllowNull, PrimaryKey, AutoIncrement, Default, ForeignKey,BelongsTo } from 'sequelize-typescript';
import { Firmwares } from '.';

@Table({
  tableName: 'firmware_versions',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class FirmwareVersions extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Firmwares)
  @Column(DataType.INTEGER)
  firmware_id!: number;

  @BelongsTo(() => Firmwares)
  firmware!: Firmwares;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  version_code!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  version_name!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  file_md5!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  file_path!: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  file_size!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  file_url!: string;

  @Default(0)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  lowest_available_version_code!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  lowest_available_version_uuid!: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  release_note!: string;

  @Default(0)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  required!: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  update_index!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  app_uuid!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  app_version_uuid!: string;

  @Default(0)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  dependence_version_code!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  dependence_version_uuid!: string;
}