export interface IUserInput {
  email: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  password: string;
  confirmPassword: string;
}

export interface IUserInputError {
  email?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
}
