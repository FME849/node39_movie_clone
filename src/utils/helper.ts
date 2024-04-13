import { HttpException, InternalServerErrorException } from '@nestjs/common';

export const handleError = (error: any) => {
  if (error instanceof HttpException) {
    return error;
  } else {
    return new InternalServerErrorException('Internal server error', {
      cause: new Error(error),
    });
  }
};
