import { Table, Column, Model, DataType, AllowNull, PrimaryKey, AutoIncrement, Default, ForeignKey } from 'sequelize-typescript';

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

  @AllowNull(false)
  @Column(DataType.STRING)
  app_name!: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  app_type!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  display_name!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  group_name!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  pkg_name!: string;
}