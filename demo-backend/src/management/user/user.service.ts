import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async getUsers() {
    return Promise.resolve([
      { name: 'user mock 1', dob: new Date().toISOString() },
      { name: 'user mock 2', dob: new Date().toISOString() },
      { name: 'user mock 3', dob: new Date().toISOString() },
      { name: 'user mock 4', dob: new Date().toISOString() },
      { name: 'user mock 5', dob: new Date().toISOString() },
    ]);
  }
}
