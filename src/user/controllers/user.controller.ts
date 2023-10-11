import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from '../dtos/user.dto';
import { UserService } from '../services/user.service';
import { ValidateCreateUserDTO } from '../dtos/user-dto.pipes';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body(ValidateCreateUserDTO) body: CreateUserDTO) {
    return await this.userService.createUser(body);
  }
}
