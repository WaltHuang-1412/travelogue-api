import { IErrorCodeList } from '../types/interfaces/IError';
function useResult() {
  const success = (code: string = '0000', message: string = 'Success') => {
    return (data: any = null) => {
      return {
        result: data,
        status: {
          code,
          message,
        },
      };
    };
  };
  const fail = (errorCode: string = '9999') => {
    const errorCodeList: IErrorCodeList = {
      '0001': 'account or password is fail',
      '0002': 'email or phone is repeat',
      '9999': 'Error',
    };
    return (data: any = null) => {
      const result = {
        name: data.name,
        message: data.message,
      };

      return {
        result,
        status: {
          code: errorCode,
          message: errorCodeList[errorCode],
        },
      };
    };
  };
  return { success };
}
