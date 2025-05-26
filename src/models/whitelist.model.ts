import { Table, Column, Model, DataType, ForeignKey,AllowNull,PrimaryKey, AutoIncrement, BelongsTo, Default } from 'sequelize-typescript';
import { User } from './';

@Table({
  tableName: 'whitelist',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Whitelist extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id!: number;

  @BelongsTo(() => User)
  user!: User;

  @AllowNull(false)
  @Column(DataType.STRING(20))
  phone!: string;

  @Default(false)
  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  access!: boolean;
}