import { HttpException, InternalServerErrorException } from '@nestjs/common';

export const handleError = (error: any) => {
  if (error instanceof HttpException) {
    throw error;
  } else {
    throw new InternalServerErrorException('Internal server error', {
      cause: error,
      description: error.message,
    });
  }
};

export const exclude = (data: Record<string, any>, keys: string[]) => {
  return Object.fromEntries(
    Object.entries(data).filter(([key]) => !keys.includes(key)),
  );
};

export const addResponseInfo = (
  response: Record<string, any>,
  message = '',
) => {
  return {
    data: response,
    message,
    date: new Date(),
  };
};

export const toSnakeCase = <T>(obj: Record<string, any>): T => {
  const keys = Object.keys(obj);
  const newObj = {};
  keys.forEach((key) => {
    const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
    newObj[snakeKey] = obj[key];
  });
  return newObj as T;
};
