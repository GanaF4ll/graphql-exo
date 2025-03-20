import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput) {
    const { email, password, firstname, lastname } = createUserInput;

    const user = await this.prisma.users.create({
      data: { email, password, firstname, lastname },
    });

    if (!user) {
      throw new InternalServerErrorException('Failed to create user');
    }

    return user;
  }

  async findAll() {
    const users = await this.prisma.users.findMany();

    return users;
  }

  findOne(id: number) {
    const user = this.prisma.users.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  findByEmail(email: string) {
    const user = this.prisma.users.findFirst({
      where: { email },
    });

    return user;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    const { email, password, firstname, lastname } = updateUserInput;

    const user = this.prisma.users.update({
      where: { id },
      data: { email, password, firstname, lastname },
    });

    return { message: 'User updated', user };
  }

  remove(id: number) {
    const user = this.prisma.users.delete({
      where: { id },
    });

    return { message: 'User deleted', user };
  }
}
