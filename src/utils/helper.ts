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

export const exclude = (data: Record<string, any>, keys: string[]) => {
  return Object.fromEntries(
    Object.entries(data).filter(([key]) => !keys.includes(key)),
  );
};
