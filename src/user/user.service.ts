import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto';
import { v4 as uuid } from 'uuid';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  hidePasswordUser(user: User): Omit<User, 'password'> {
    const rest = { ...user };
    delete rest.password;
    return rest;
  }

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const { login, password } = createUserDto;

    const entity = await this.prisma.user.create({
      data: {
        id: uuid(),
        login,
        password,
        version: 1,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    });

    return this.hidePasswordUser(entity);
  }
  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.prisma.user.findMany();
    return users.map(this.hidePasswordUser);
  }

  async findOne(id: string): Promise<Omit<User, 'password'>> {
    if (!id) throw new BadRequestException('User ID is required');

    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);

    return this.hidePasswordUser(user);
  }

  async update(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new BadRequestException('Old password is incorrect');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: updatePasswordDto.newPassword,
        updatedAt: Date.now(),
        version: user.version + 1,
      },
    });

    return this.hidePasswordUser(updatedUser);
  }

  async remove(id: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);

    await this.prisma.user.delete({ where: { id } });
  }
}
