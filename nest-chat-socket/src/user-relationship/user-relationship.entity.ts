import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum RelationshipType {
  PendingFirstSecond = 'pending_first_second',
  PendingSecondFirst = 'pending_second_first',
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
}
