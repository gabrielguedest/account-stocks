import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDTO } from "../dtos/user.dto";
import { UserService } from "../services/user.service";

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post()
  async createUser(@Body() body: CreateUserDTO) {
    body.validate();

    return await this.userService.createUser(body);
  }
}