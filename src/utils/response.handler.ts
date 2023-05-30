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

export const successHandler = (data: any, message: string) => {
  return responseBuilder(200, true, message || 'Success', data);
};

export const unauthorized = (message = 'Unauthorized!') => {
  return responseBuilder(401, false, message, {});
};

export const errorhandler = (code: number, errormessage: string) => {
  return responseBuilder(code, false, errormessage, {});
};

export const forbidden = (message: string) => {
  return responseBuilder(403, false, message, {});
};

export const notfound = (message = 'Not found') => {
  return responseBuilder(404, false, message, {});
};
