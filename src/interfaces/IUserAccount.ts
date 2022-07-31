export interface IUserAccount {
  _id: string;
  no: string;
  account: string;
  name: string;
  password: string;
  hasVerified: string;
  verificationTime: string;
  actFlg: string;
  createdUser: number;
  updatedUser: number;
  salt: string;
}

export interface IUserAccountInputDTO {
  account: string;
  name: string;
  password: string;
}
