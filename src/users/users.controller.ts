import { Body, Controller, Get, Param, Post } from '@nestjs/common';


interface User {
  id: String;
  name: string;
  email: string;
}

@Controller('users')
export class UsersController {
  private users: User[] = [
    { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com' },
    { id: '3', name: 'Bob Johnson', email: 'bob.johnson@example.com' }
  ];
  @Get()
  getUsers() {
    return this.users;
  }
  @Get(':id')
  findUserById(@Param('id') id: string) {
    const user = this.users.find(user => user.id === id);
    if (!user) {
      return { message: 'User not found' };
    }
    return user;
  }
  @Post()
  createUser(@Body() body: User) {
    this.users.push(body);
    return body;
  }
}
