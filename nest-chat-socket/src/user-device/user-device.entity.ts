import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users_devices')
export class UserDevice {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 36, nullable: true })
  userId: string;

  @Column({ length: 36, nullable: true })
  deviceId: string;

  @Column({ length: 20, nullable: true })
  socketId: string;
}
