import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';


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
    const newUser = {
      ...body,
      id: `${this.users.length + 1}`
    };
    this.users.push(newUser);
    return newUser;
  }
  @Delete(':id')
  deleteUser(@Param('id') id: string) {

    const position = this.users.findIndex((user) => user.id === id);
    if (position === -1) {
      return { error: 'User not found' };
    }
    this.users.splice(position, 1);
    return { message: 'User deleted successfully' };
  }
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() changes: User) {
    const position = this.users.findIndex((user) => user.id === id);
    if (position === -1) {
      return { error: 'User not found' };
    }
    const currentUser = this.users[position];
    const updatedUser = {
      ...currentUser,
      ...changes
    };
    this.users[position] = updatedUser;
    return updatedUser;
  }
}
