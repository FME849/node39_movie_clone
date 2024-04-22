import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { addResponseInfo, exclude, handleError } from 'src/utils/helper';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    try {
      const users = await this.prisma.users.findMany();
      const usersWithoutPassword = users.map((user) =>
        exclude(user, ['pass_word']),
      );
      return addResponseInfo(
        usersWithoutPassword,
        'Successfully get users list',
      );
    } catch (error) {
      handleError(error);
    }
  }

  async getPaginatedUsers(page: number, itemsPerPage: number) {
    try {
      const skip = (page - 1) * itemsPerPage;
      const paginatedUsers = await this.prisma.users.findMany({
        skip,
        take: itemsPerPage,
      });
      return addResponseInfo(
        paginatedUsers,
        'Successfully get paginated users list',
      );
    } catch (error) {
      handleError(error);
    }
  }

  async getUserById(id: number, payload: Record<string, any>) {
    try {
      const { userId } = payload;
      if (userId !== id) {
        throw new ForbiddenException();
      }

      const userInfo = await this.prisma.users.findUnique({
        where: {
          user_id: userId,
        },
        include: {
          book_ticket: true,
        },
      });
      const userInfoWithoutPassword = exclude(userInfo, ['pass_word']);
      return addResponseInfo(
        userInfoWithoutPassword,
        'Successfully get user info',
      );
    } catch (error) {
      handleError(error);
    }
  }
}
