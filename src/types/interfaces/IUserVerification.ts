export interface IUserVerification {
  userAccountId: string;
  sendTime ?: string;
  purpose ?: string;
  type ?: string;
  code ?: string;
  time ?: string;
  errorCount ?: number;
  hasVerified ?: string;
  createUser ?: number;
  updatedUser ?: number;
}
