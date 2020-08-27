import { Body, Controller, Delete, Get, Param, Post, Res } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { TestService } from '../test/test.service';
import { User } from './domain/User';

@Controller('user')
export class UserController {

  constructor(
    private userService: UserService,
    private testService: TestService
  ) {
    this.userService = userService;
    this.testService = testService;
  }

  @Get('test')
  findAnotherTest(): string {
    return this.testService.getInfo();
  }

  @Get('list')
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':userId')
  findOne(@Param('userId') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  async saveUser(@Body() user: User): Promise<string> {
    await this.userService.saveUser(user);
    return Object.assign({
      data: { ...user },
      statusCode: 201,
      statusMsg: `saved successfully`,
    });
  }

  @Delete(':userId')
  async deleteUser(@Param('userId') id: string): Promise<string> {
    await this.userService.deleteUser(id);
    return Object.assign({
      data: { userId: id },
      statusCode: 201,
      statusMsg: `deleted successfully`,
    });
  }
}
