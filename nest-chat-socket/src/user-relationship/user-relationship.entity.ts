import { User } from 'src/auth/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum RelationshipType {
  Pending = 'pending',
  Cancel = 'cancel',
  Friends = 'friends',
}

@Entity('users_relationships')
export class UserRelationship {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 36, nullable: true })
  userFirstId: string;

  @Column({ length: 36, nullable: true })
  userSecondId: string;

  @Column({ nullable: true })
  type: RelationshipType;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'userFirstId' })
  firstUser: User;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'userSecondId' })
  secondUser: User;
}
