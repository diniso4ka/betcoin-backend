import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserController } from './users.controller';
import {SequelizeModule} from '@nestjs/sequelize';
import {User} from './users.model';

@Module({
  controllers: [UserController],
  providers: [UsersService],
  imports:[
      SequelizeModule.forFeature([User])
  ]
})
export class UsersModule {}
