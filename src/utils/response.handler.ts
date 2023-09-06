import { HttpException } from '@nestjs/common';

export const responseBuilder = (
  code: number,
  success: boolean,
  message: string,
  body: any,
) => {
  return {
    statusCode: code,
    isSuccess: success,
    message: message,
    body: body,
  };
};

export const created = (data: any) => {
  return responseBuilder(201, true, 'Success', data);
};

export const successHandler = (message: string, data: any) => {
  return responseBuilder(200, true, message || 'Success', data);
};

export const unauthorized = (message = 'Unauthorized!') => {
  throw new HttpException(message, 401);
};

export const errorhandler = (code: number, errormessage: string) => {
  console.log(errormessage);
  throw new HttpException(errormessage, code);
};

export const forbidden = (message: string) => {
  throw new HttpException(message, 403);
};

export const notfound = (message = 'Not found') => {
  throw new HttpException(message, 404);
};
