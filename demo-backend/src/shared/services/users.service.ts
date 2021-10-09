import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../../shared';

const users: CreateUserDto[] = [
  {
    id: 1,
    name: 'test',
    description: 'for test purpose only',
    password: 'Pa$$w0rd',
  },
  {
    id: 2,
    name: 'sa',
    description: 'for testing admin permission only',
    password: 'Pa$$w0rd',
  },
  {
    id: 3,
    name: 'regular',
    description: 'for development only',
    password: 'Pa$$w0rd',
  },
];

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findByUserName(username: string): Promise<CreateUserDto | undefined> {
    return users.find((user) => user.name === username);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
