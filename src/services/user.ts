import { IUserAccount, IUserAccountInputDTO } from '../types/interfaces/IUserAccount';

function test(constructor: Function) {
  console.log('123 :>> ', 123);
  console.log('constructor :>> ', constructor);
}

function UserService() {
  @test
  const signUp = (userAccountInputDTO: IUserAccountInputDTO) => {};
  return {};
}
