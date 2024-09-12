import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserRelationshipController } from './user-relationship.controller';
import { UserRelationshipService } from './user-relationship.service';
import { UserRelationship } from './user-relationship.entity';
import { User } from 'src/auth/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRelationship])],
  controllers: [UserRelationshipController],
  providers: [UserRelationshipService],
})
export class UserRelationshipModule {}
