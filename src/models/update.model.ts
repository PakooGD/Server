import { Table, Column, Model, DataType, AllowNull, PrimaryKey, AutoIncrement, Default, ForeignKey } from 'sequelize-typescript';
import { User } from './user.model';

@Table({
  tableName: 'apps',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Updates extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  app_name!: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  app_type!: number;

  @AllowNull(false)
  @Column(DataType.UUID)
  app_uuid!: string;

  @AllowNull(false)
  @Column(DataType.UUID)
  app_version_uuid!: string;

  @Default(0)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  dependence_version_code!: number;

  @Default('')
  @AllowNull(false)
  @Column(DataType.STRING)
  dependence_version_uuid!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  display_name!: string;

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

  @AllowNull(false)
  @Column(DataType.STRING)
  group_name!: string;

  @Default(0)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  lowest_available_version_code!: number;

  @Default('')
  @AllowNull(false)
  @Column(DataType.STRING)
  lowest_available_version_uuid!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  pkg_name!: string;

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
  @Column(DataType.INTEGER)
  version_code!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  version_name!: string;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id!: number;
}