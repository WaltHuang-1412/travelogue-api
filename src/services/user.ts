import { IUserAccount, IUserAccountInputDTO } from '../types/interfaces/IUserAccount';

const WithErrorLog = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
  const fn = descriptor.value;
  descriptor.value = async (...args: any) => {
    try {
      await fn.apply(this, args);
    } catch (error) {
      console.log('error :>> ', error);
      console.log('Entered Catch----->');
      const [, , next] = args;
      next(error);
    }
  };
};

class UserService {
  @WithErrorLog
  signUp() {
    new Error('test test');
  }
}

const UserServiceInstance = new UserService();
UserServiceInstance.signUp();
